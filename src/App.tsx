import Router from './Router'
import { TasksPage } from "./pages/TasksPage"
import { TaskPage } from "./pages/TaskPage"

export const App = () => {
  const routes = {
    '/': TasksPage,
    '/tasks/:id': TaskPage,
    '*': () => <div>404 page not found</div>
  }
  return (
    <Router routes={routes}/>
  )
}

