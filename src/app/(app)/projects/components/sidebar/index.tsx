import { SearchBar } from './components/search-bar'
import { ProjectsList } from './components/projects-list'
import { ProjectsAmountInfo } from './components/projects-amount-info'
import { getRolesItensFromCms } from '@/actions/get-roles-itens-from-cms'
import { getGeneralSkillsItens } from '@/actions/get-general-skills-itens'

export async function SideBar() {
  const { roles } = await getRolesItensFromCms()
  const { generalSkills } = await getGeneralSkillsItens({})

  return (
    <aside className="fixed mt-[9rem] h-screen w-full max-w-[25.75rem] space-y-6 pb-56">
      <header className="flex items-start justify-between pr-3">
        <div>
          <span className="block text-lg font-medium">Lista de projetos</span>
          <ProjectsAmountInfo />
        </div>

        <SearchBar roles={roles} generalSkills={generalSkills} />
      </header>

      <ProjectsList rolesItens={roles} generalSkillsItens={generalSkills} />
    </aside>
  )
}
