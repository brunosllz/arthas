export type MeProjects = {
  id: string
  status:  'inProgress' | 'recruiting' | 'closed'
  slug: string
  bannerUrl: string
  name: string
  description: string
  myRoles: Array<{ id: string; name: string ; slug: string}>
  teamMembers: Array<{ id: string; name: string; avatarUrl: string }>
}


