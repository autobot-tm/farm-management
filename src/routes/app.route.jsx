import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from '../hoc/MainLayout'
import { PrivateRoute } from './privates.route'
import { routePaths } from './paths.route'
import { ErrorPage } from '../pages/Error'

export const AppRouter = () => {
  const protectRoute = (
    <PrivateRoute>
      <MainLayout />
    </PrivateRoute>
  )
  return (
    <BrowserRouter>
      <Routes>
        {routePaths.public.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        <Route element={protectRoute}>
          <Route key={'*'} path={'*'} element={<ErrorPage />} />
        </Route>
        <Route element={protectRoute}>
          {routePaths.private.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
