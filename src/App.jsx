import { RouterProvider, createBrowserRouter } from "react-router-dom"
import DataProvider from "./Context/DataContext"
import Home from "./Pages/Home"
import Layout from "./Layout/Layout"
import MyLinks from "./Pages/MyLinks"
import AuthForm from "./Pages/Auth"

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
      path: '/',
      element: <Home />
    },{
      path: '/mylinks',
      element: <MyLinks />
    }
  ]
  },
  {
    path : '/login',
    element : <AuthForm />
  }
])

function App() {
  
  return (
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
  )
}

export default App
