export function formatDuration(seconds: number): string {
    const totalSeconds = Math.floor(seconds)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const secs = totalSeconds % 60
  
    let result = ''
    if (hours > 0) result += `${hours}h `
    if (minutes > 0) result += `${minutes}m `
    if (secs > 0 || result === '') result += `${secs}s`
  
    return result.trim()
}
