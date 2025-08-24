import sharp from 'sharp'
import ffmpeg from 'fluent-ffmpeg'
import { promises as fs } from 'fs'
import path from 'path'

export interface MediaProcessingOptions {
  quality?: number
  format?: 'jpeg' | 'png' | 'webp' | 'avif'
  width?: number
  height?: number
  crop?: boolean
  optimize?: boolean
}

export interface MediaAnalysis {
  width?: number
  height?: number
  format: string
  size: number
  hasAlpha?: boolean
  colorSpace?: string
  density?: number
  duration?: number // for video/audio
  bitrate?: number // for video/audio
  frameRate?: number // for video
  channels?: number // for audio
  sampleRate?: number // for audio
  codec?: string
}

export interface ProcessingResult {
  originalPath: string
  processedPath: string
  originalSize: number
  processedSize: number
  compressionRatio: number
  formats: Array<{
    format: string
    path: string
    size: number
  }>
}

export class MediaProcessor {
  private readonly supportedImageFormats = ['jpeg', 'jpg', 'png', 'webp', 'avif', 'gif', 'svg']
  private readonly supportedVideoFormats = ['mp4', 'webm', 'avi', 'mov', 'wmv', 'flv', 'mkv']
  private readonly supportedAudioFormats = ['mp3', 'wav', 'aac', 'ogg', 'flac', 'm4a']

  public async analyzeMedia(filePath: string): Promise<MediaAnalysis> {
    const stats = await fs.stat(filePath)
    const ext = path.extname(filePath).toLowerCase().substring(1)
    
    const analysis: MediaAnalysis = {
      format: ext,
      size: stats.size,
    }

    try {
      if (this.supportedImageFormats.includes(ext)) {
        const metadata = await sharp(filePath).metadata()
        analysis.width = metadata.width
        analysis.height = metadata.height
        analysis.hasAlpha = metadata.hasAlpha
        analysis.colorSpace = metadata.space
        analysis.density = metadata.density
      } else if (this.supportedVideoFormats.includes(ext)) {
        const videoInfo = await this.getVideoInfo(filePath)
        analysis.width = videoInfo.width
        analysis.height = videoInfo.height
        analysis.duration = videoInfo.duration
        analysis.bitrate = videoInfo.bitrate
        analysis.frameRate = videoInfo.frameRate
        analysis.codec = videoInfo.codec
      } else if (this.supportedAudioFormats.includes(ext)) {
        const audioInfo = await this.getAudioInfo(filePath)
        analysis.duration = audioInfo.duration
        analysis.bitrate = audioInfo.bitrate
        analysis.channels = audioInfo.channels
        analysis.sampleRate = audioInfo.sampleRate
        analysis.codec = audioInfo.codec
      }
    } catch (error) {
      console.error('Error analyzing media:', error)
    }

    return analysis
  }

  public async processImage(
    inputPath: string,
    outputDir: string,
    options: MediaProcessingOptions = {}
  ): Promise<ProcessingResult> {
    const {
      quality = 80,
      format = 'jpeg',
      width,
      height,
      crop = false,
      optimize = true,
    } = options

    const inputStats = await fs.stat(inputPath)
    const filename = path.basename(inputPath, path.extname(inputPath))
    const outputPath = path.join(outputDir, `${filename}_processed.${format}`)

    let processor = sharp(inputPath)

    // Resize if dimensions provided
    if (width || height) {
      processor = processor.resize(width, height, {
        fit: crop ? 'cover' : 'inside',
        withoutEnlargement: true,
      })
    }

    // Apply format-specific optimizations
    switch (format) {
      case 'jpeg':
        processor = processor.jpeg({ 
          quality, 
          progressive: true,
          mozjpeg: optimize,
        })
        break
      case 'png':
        processor = processor.png({ 
          quality, 
          progressive: true,
          compressionLevel: optimize ? 9 : 6,
        })
        break
      case 'webp':
        processor = processor.webp({ 
          quality,
          effort: optimize ? 6 : 4,
        })
        break
      case 'avif':
        processor = processor.avif({ 
          quality,
          effort: optimize ? 9 : 4,
        })
        break
    }

    await processor.toFile(outputPath)

    const outputStats = await fs.stat(outputPath)
    const compressionRatio = (inputStats.size - outputStats.size) / inputStats.size

    // Generate additional formats
    const formats = await this.generateMultipleFormats(inputPath, outputDir, {
      ...options,
      optimize,
    })

    return {
      originalPath: inputPath,
      processedPath: outputPath,
      originalSize: inputStats.size,
      processedSize: outputStats.size,
      compressionRatio,
      formats,
    }
  }

  public async processVideo(
    inputPath: string,
    outputDir: string,
    options: {
      quality?: 'low' | 'medium' | 'high'
      format?: 'mp4' | 'webm'
      width?: number
      height?: number
      bitrate?: string
    } = {}
  ): Promise<ProcessingResult> {
    const {
      quality = 'medium',
      format = 'mp4',
      width,
      height,
      bitrate,
    } = options

    const inputStats = await fs.stat(inputPath)
    const filename = path.basename(inputPath, path.extname(inputPath))
    const outputPath = path.join(outputDir, `${filename}_processed.${format}`)

    return new Promise((resolve, reject) => {
      let command = ffmpeg(inputPath)

      // Set quality preset
      const qualitySettings = {
        low: { crf: 28, preset: 'fast' },
        medium: { crf: 23, preset: 'medium' },
        high: { crf: 18, preset: 'slow' },
      }

      const settings = qualitySettings[quality]

      if (format === 'mp4') {
        command = command
          .videoCodec('libx264')
          .audioCodec('aac')
          .addOption('-crf', settings.crf.toString())
          .addOption('-preset', settings.preset)
      } else if (format === 'webm') {
        command = command
          .videoCodec('libvpx-vp9')
          .audioCodec('libopus')
          .addOption('-crf', settings.crf.toString())
      }

      // Resize if dimensions provided
      if (width && height) {
        command = command.size(`${width}x${height}`)
      } else if (width) {
        command = command.size(`${width}x?`)
      } else if (height) {
        command = command.size(`?x${height}`)
      }

      // Set bitrate if provided
      if (bitrate) {
        command = command.videoBitrate(bitrate)
      }

      command
        .output(outputPath)
        .on('end', async () => {
          try {
            const outputStats = await fs.stat(outputPath)
            const compressionRatio = (inputStats.size - outputStats.size) / inputStats.size

            resolve({
              originalPath: inputPath,
              processedPath: outputPath,
              originalSize: inputStats.size,
              processedSize: outputStats.size,
              compressionRatio,
              formats: [
                {
                  format,
                  path: outputPath,
                  size: outputStats.size,
                },
              ],
            })
          } catch (error) {
            reject(error)
          }
        })
        .on('error', reject)
        .run()
    })
  }

  public async generateThumbnail(
    inputPath: string,
    outputPath: string,
    options: {
      width?: number
      height?: number
      timeOffset?: number // for video thumbnails
    } = {}
  ): Promise<string> {
    const { width = 300, height = 300, timeOffset = 1 } = options
    const ext = path.extname(inputPath).toLowerCase().substring(1)

    if (this.supportedImageFormats.includes(ext)) {
      // Generate image thumbnail
      await sharp(inputPath)
        .resize(width, height, {
          fit: 'cover',
          position: 'center',
        })
        .jpeg({ quality: 80 })
        .toFile(outputPath)
    } else if (this.supportedVideoFormats.includes(ext)) {
      // Generate video thumbnail
      return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
          .screenshots({
            timestamps: [timeOffset],
            filename: path.basename(outputPath),
            folder: path.dirname(outputPath),
            size: `${width}x${height}`,
          })
          .on('end', () => resolve(outputPath))
          .on('error', reject)
      })
    } else {
      throw new Error(`Unsupported format for thumbnail generation: ${ext}`)
    }

    return outputPath
  }

  public async optimizeForWeb(
    inputPath: string,
    outputDir: string
  ): Promise<{
    webp: string
    avif?: string
    fallback: string
    sizes: Record<string, string>
  }> {
    const filename = path.basename(inputPath, path.extname(inputPath))
    
    // Generate WebP version
    const webpPath = path.join(outputDir, `${filename}.webp`)
    await sharp(inputPath)
      .webp({ quality: 80, effort: 6 })
      .toFile(webpPath)

    // Generate AVIF version (if supported)
    let avifPath: string | undefined
    try {
      avifPath = path.join(outputDir, `${filename}.avif`)
      await sharp(inputPath)
        .avif({ quality: 70, effort: 9 })
        .toFile(avifPath)
    } catch (error) {
      console.warn('AVIF generation failed:', error)
    }

    // Generate fallback JPEG
    const fallbackPath = path.join(outputDir, `${filename}_optimized.jpg`)
    await sharp(inputPath)
      .jpeg({ quality: 85, progressive: true, mozjpeg: true })
      .toFile(fallbackPath)

    // Generate different sizes
    const sizes: Record<string, string> = {}
    const sizeConfigs = [
      { name: 'small', width: 400 },
      { name: 'medium', width: 800 },
      { name: 'large', width: 1200 },
      { name: 'xlarge', width: 1920 },
    ]

    for (const config of sizeConfigs) {
      const sizePath = path.join(outputDir, `${filename}_${config.name}.webp`)
      await sharp(inputPath)
        .resize(config.width, null, { withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(sizePath)
      sizes[config.name] = sizePath
    }

    return {
      webp: webpPath,
      avif: avifPath,
      fallback: fallbackPath,
      sizes,
    }
  }

  private async generateMultipleFormats(
    inputPath: string,
    outputDir: string,
    options: MediaProcessingOptions
  ): Promise<Array<{ format: string; path: string; size: number }>> {
    const formats = ['webp', 'avif', 'jpeg']
    const results: Array<{ format: string; path: string; size: number }> = []
    const filename = path.basename(inputPath, path.extname(inputPath))

    for (const format of formats) {
      try {
        const outputPath = path.join(outputDir, `${filename}.${format}`)
        
        let processor = sharp(inputPath)
        
        if (options.width || options.height) {
          processor = processor.resize(options.width, options.height, {
            fit: options.crop ? 'cover' : 'inside',
            withoutEnlargement: true,
          })
        }

        switch (format) {
          case 'webp':
            processor = processor.webp({ quality: options.quality || 80 })
            break
          case 'avif':
            processor = processor.avif({ quality: (options.quality || 80) - 10 })
            break
          case 'jpeg':
            processor = processor.jpeg({ quality: options.quality || 80 })
            break
        }

        await processor.toFile(outputPath)
        const stats = await fs.stat(outputPath)
        
        results.push({
          format,
          path: outputPath,
          size: stats.size,
        })
      } catch (error) {
        console.warn(`Failed to generate ${format} format:`, error)
      }
    }

    return results
  }

  private async getVideoInfo(filePath: string): Promise<{
    width?: number
    height?: number
    duration?: number
    bitrate?: number
    frameRate?: number
    codec?: string
  }> {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(filePath, (err, metadata) => {
        if (err) {
          reject(err)
          return
        }

        const videoStream = metadata.streams.find(s => s.codec_type === 'video')
        
        resolve({
          width: videoStream?.width,
          height: videoStream?.height,
          duration: metadata.format.duration,
          bitrate: metadata.format.bit_rate ? parseInt(metadata.format.bit_rate) : undefined,
          frameRate: videoStream?.r_frame_rate ? eval(videoStream.r_frame_rate) : undefined,
          codec: videoStream?.codec_name,
        })
      })
    })
  }

  private async getAudioInfo(filePath: string): Promise<{
    duration?: number
    bitrate?: number
    channels?: number
    sampleRate?: number
    codec?: string
  }> {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(filePath, (err, metadata) => {
        if (err) {
          reject(err)
          return
        }

        const audioStream = metadata.streams.find(s => s.codec_type === 'audio')
        
        resolve({
          duration: metadata.format.duration,
          bitrate: metadata.format.bit_rate ? parseInt(metadata.format.bit_rate) : undefined,
          channels: audioStream?.channels,
          sampleRate: audioStream?.sample_rate,
          codec: audioStream?.codec_name,
        })
      })
    })
  }
}

// Utility functions for easy use
export async function analyzeMediaFile(filePath: string): Promise<MediaAnalysis> {
  const processor = new MediaProcessor()
  return await processor.analyzeMedia(filePath)
}

export async function optimizeImage(
  inputPath: string,
  outputDir: string,
  options?: MediaProcessingOptions
): Promise<ProcessingResult> {
  const processor = new MediaProcessor()
  return await processor.processImage(inputPath, outputDir, options)
}

export async function generateWebOptimizedImages(
  inputPath: string,
  outputDir: string
): Promise<{
  webp: string
  avif?: string
  fallback: string
  sizes: Record<string, string>
}> {
  const processor = new MediaProcessor()
  return await processor.optimizeForWeb(inputPath, outputDir)
}

