import { Badge } from '@/components/ui/badge'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/motion/reveal'
import { videos, type VideoItem } from '@/lib/portfolio-config'

export function VideoShowcase() {
  return (
    <section
      id="videos"
      className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24 sm:py-32"
    >
      <SectionHeading
        index="04"
        title="Video Showcase"
        description="Recorded breakdowns of systems in action — combat loops, world generation and more."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        {videos.map((video, i) => (
          <Reveal key={video.title} delay={i * 0.08}>
            <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card">
              <div className="relative aspect-video overflow-hidden bg-background">
                <VideoFrame video={video} />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-medium">{video.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {video.description}
                </p>
                {video.notes ? (
                  <p className="mt-4 border-l border-border pl-4 text-sm italic leading-relaxed text-muted-foreground">
                    {video.notes}
                  </p>
                ) : null}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {video.stack.map((tech) => (
                    <Badge key={tech} variant="secondary" className="font-mono text-[11px]">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function VideoFrame({ video }: { video: VideoItem }) {
  if (video.type === 'mp4') {
    return (
      <video
        controls
        poster={video.poster}
        className="h-full w-full object-cover"
        preload="metadata"
      >
        <source src={video.source} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    )
  }

  return (
    <iframe
      src={video.source}
      title={video.title}
      loading="lazy"
      className="h-full w-full"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  )
}
