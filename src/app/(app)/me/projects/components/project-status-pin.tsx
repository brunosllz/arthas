export function ProjectStatusPin({
  status,
}: {
  status: 'recruiting' | 'draft' | 'closed'
}) {
  return (
    <div className="relative h-20 w-20 rounded-full bg-zinc-700">
      <span className="absolute bottom-1 right-1 flex h-4 w-4">
        <span
          data-status={status}
          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75  data-[status=closed]:hidden data-[status=recruiting]:bg-green-400"
        />
        <span
          data-status={status}
          className="relative inline-flex h-4 w-4 rounded-full data-[status=closed]:bg-red-400 data-[status=recruiting]:bg-green-400"
        />
      </span>
    </div>
  )
}
