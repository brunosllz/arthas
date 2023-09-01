import { ProjectCard } from './project-card'

const projects = [
  {
    id: '1',
    name: 'Dev Xperience',
    status: 'recruiting',
    technologies: ['react', 'nest-js', 'next-js', 'react-native'],
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam ab accusantium e, quo voluptas, fugiat aut, velit sequi aliquid facilis laceata...',
  },
  {
    id: '2',
    name: 'Dev Xperience',
    status: 'recruiting',
    technologies: ['react', 'java', 'next-js', 'react-native'],
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam ab accusantium e, quo voluptas, fugiat aut, velit sequi aliquid facilis laceata...',
  },
  {
    id: '3',
    name: 'Dev Xperience',
    status: 'closed',
    technologies: ['react', 'nest-js', 'next-js', 'git'],
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam ab accusantium e, quo voluptas, fugiat aut, velit sequi aliquid facilis laceata...',
  },
  {
    id: '4',
    name: 'Dev Xperience',
    status: 'draft',
    technologies: ['react', 'github', 'next-js', 'python'],
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam ab accusantium e, quo voluptas, fugiat aut, velit sequi aliquid facilis laceata...',
  },
]

export function ProjectList() {
  return (
    <ul className="grid grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          name={project.name}
          description={project.description}
          status={project.status as 'recruiting' | 'draft' | 'closed'}
          technologies={project.technologies}
        />
      ))}
    </ul>
  )
}
