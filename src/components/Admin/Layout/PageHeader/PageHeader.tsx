interface PageHeaderProps {
    title: string
    subtitle?: string
    rightSlot?: React.ReactNode
}
  
export default function PageHeader({ title, subtitle, rightSlot }: PageHeaderProps) {
return (
    <div className="flex items-center justify-between mb-6">
    <div>
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </div>
    {rightSlot && <div>{rightSlot}</div>}
    </div>
)
}
