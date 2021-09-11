export interface NewsItem {
    id?: number
    title?: string
    coverImageUrl?: string
    content?: string
    description?: string
    subtitle?: string
    url: string
    details?: NewsItem
}
