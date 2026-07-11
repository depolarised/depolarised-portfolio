import { MonoLabel } from './MonoLabel'

/** Opening band of a subpage — transparent so the fixed shader field shows
 *  through (dark mode already maps the text/accents for the grape base). */
export function PageHeader({
  label,
  title,
  titleJa,
  description,
}: {
  label: string
  title: string
  titleJa?: string
  description?: string
}) {
  return (
    <section>
      <div className="section-container py-16 md:py-24">
        <MonoLabel className="text-chalk/70">{label}</MonoLabel>
        <h1 className="mt-4 font-display text-display text-chalk">
          {title}
          {titleJa && <span className="jp-mark text-accent">{titleJa}</span>}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-body-lg leading-relaxed text-chalk/85">
            {description}
          </p>
        )}
      </div>
    </section>
  )
}
