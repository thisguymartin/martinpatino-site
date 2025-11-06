/**
 * SEO utilities for JSON-LD structured data
 */

export interface PersonSchema {
  name: string
  url?: string
  image?: string
  jobTitle?: string
  worksFor?: {
    name: string
    url?: string
  }
  sameAs?: string[]
}

export interface ArticleSchema {
  headline: string
  description: string
  datePublished: string
  dateModified?: string
  author: {
    name: string
    url?: string
  }
  image?: string
  url: string
}

/**
 * Generate JSON-LD Person schema
 */
export function usePersonSchema(person: PersonSchema) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    ...(person.url && { url: person.url }),
    ...(person.image && { image: person.image }),
    ...(person.jobTitle && { jobTitle: person.jobTitle }),
    ...(person.worksFor && {
      worksFor: {
        '@type': 'Organization',
        name: person.worksFor.name,
        ...(person.worksFor.url && { url: person.worksFor.url })
      }
    }),
    ...(person.sameAs && person.sameAs.length > 0 && { sameAs: person.sameAs })
  }

  useHead({
    script: [
      {
        type: 'application/ld+json',
        textContent: JSON.stringify(schema)
      }
    ]
  })
}

/**
 * Generate JSON-LD Article schema
 */
export function useArticleSchema(article: ArticleSchema) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Person',
      name: article.author.name,
      ...(article.author.url && { url: article.author.url })
    },
    ...(article.image && {
      image: {
        '@type': 'ImageObject',
        url: article.image
      }
    }),
    url: article.url
  }

  useHead({
    script: [
      {
        type: 'application/ld+json',
        textContent: JSON.stringify(schema)
      }
    ]
  })
}
