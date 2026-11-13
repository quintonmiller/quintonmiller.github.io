// Resume layout — data lives in resume.yaml.
// Build with `npm run resume:build` (outputs public/Quinton-Miller-Resume.pdf).
// A tailored variant can swap the data file: `npm run resume:build -- <variant>`
// reads resume/local/<variant>/resume.yaml (git-ignored).

#let data = yaml(sys.inputs.at("data", default: "resume.yaml"))

#let accent = rgb("#C2710C") // matches --color-accent on quinton.dev
#let ink = rgb("#1A1A1A")
#let muted = rgb("#5A5A5A")

#set document(
  title: data.basics.name + " · Résumé",
  author: data.basics.name,
)
#set page(paper: "us-letter", margin: (x: 0.7in, y: 0.7in))
#set text(font: "Libertinus Serif", size: 10pt, fill: ink)
#set par(leading: 0.58em)
#show link: set text(fill: ink)

#let section(title) = {
  v(6pt)
  block(
    below: 9pt,
    stack(
      spacing: 5pt,
      text(size: 9pt, weight: "bold", fill: accent, upper(title)),
      line(length: 100%, stroke: 0.6pt + accent.lighten(55%)),
    ),
  )
}

// ── Header ──────────────────────────────────────────────

#align(center)[
  #text(size: 23pt, weight: "bold", tracking: 0.5pt, data.basics.name)
  #v(-3pt)
  #text(size: 11pt, fill: accent, smallcaps(lower(data.basics.label)))
  #v(-3pt)
  #text(size: 9pt, fill: muted)[
    #link("mailto:" + data.basics.email)[#data.basics.email]
    #h(5pt) · #h(5pt)
    #link("https://" + data.basics.website)[#data.basics.website]
    #for p in data.basics.profiles [
      #h(5pt) · #h(5pt)
      #link(p.url)[#p.display]
    ]
  ]
]

#v(6pt)
#par(justify: true, text(size: 9.5pt, data.summary))

// ── Experience ──────────────────────────────────────────

#section("Experience")

#for job in data.work {
  block(
    below: 10pt,
    [
      #grid(
        columns: (1fr, auto),
        [
          #text(weight: "bold", job.company)
          #h(6pt)
          #text(style: "italic", size: 9.5pt, job.position)
        ],
        align(right, text(size: 9pt, fill: muted, job.start + " – " + job.end)),
      )
      #v(2pt)
      #list(
        indent: 6pt,
        body-indent: 5pt,
        spacing: 5pt,
        marker: text(fill: accent, "•"),
        ..job.highlights.map(h => text(size: 9.5pt, h)),
      )
    ],
  )
}

// ── Projects ────────────────────────────────────────────

#section("Independent Projects")

#for project in data.projects {
  block(
    below: 11pt,
    [
      #text(weight: "bold", link(project.url, project.name))
      #h(6pt)
      #text(size: 8.5pt, fill: muted, project.technologies.join(" · "))
      #v(-2pt)
      #text(size: 9.5pt, project.description)
    ],
  )
}

// ── Skills ──────────────────────────────────────────────

#section("Skills")

#grid(
  columns: (auto, 1fr),
  column-gutter: 14pt,
  row-gutter: 6.5pt,
  ..data.skills
    .map(group => (
      text(size: 9.5pt, weight: "bold", group.category),
      text(size: 9.5pt, group.items.join(" · ")),
    ))
    .flatten(),
)

// ── Education ───────────────────────────────────────────

#section("Education")

#for school in data.education {
  grid(
    columns: (1fr, auto),
    [
      #text(weight: "bold", school.institution)
      #h(6pt)
      #text(size: 9.5pt, school.degree)
    ],
    align(right, text(size: 9pt, fill: muted, school.date)),
  )
}
