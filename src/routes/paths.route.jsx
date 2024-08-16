import { routeNames } from '../config'
import Dashboard from '../pages/Dashboard/Dashboard'
import PlantsPage from '../pages/Plants/PlantsPage'
import SignIn from '../pages/SignIn/SignIn'
import UserProfile from '../pages/UserProfile/UserProfile'

export const routePaths = {
  public: [
    {
      path: routeNames.SignIn,
      element: <SignIn />,
    },
  ],
  private: [
    {
      path: routeNames.Home,
      element: <Dashboard />,
    },
    {
      path: routeNames.User,
      element: <UserProfile />,
    },
    {
      path: routeNames.Plants,
      element: <PlantsPage />,
    },
  ],
}
