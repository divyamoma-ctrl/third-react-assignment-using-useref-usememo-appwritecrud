// import { createBrowserRouter } from "react-router-dom";
// import Wrapper from "../layouts/Wrapper";
// // import LargeForm from "../pages/ProductForm";
// // import Home from "../pages/Home";
// import Stopwatch from "../pages/Stopwatch";
// // import StudentForm from "../pages/CRUD";
// // import CRUD from "../pages/CRUD";
// import Students from "../pages/Students";
// import StudentDetails from "../pages/StudentDetails";
// import ProductForm from "../pages/ProductForm";
// import AddStudent from "../pages/AddStudent";
// import EditStudent from "../pages/EditStudent";


// const Routes = createBrowserRouter([
//   {
//     path: "/",
//     element: <Wrapper />,
//     children: [
//       {
//         path: "",
//         element: <Home />,
//       },
//       {
//         path: "productform",
//         element: <ProductForm />,
//       },
//       {
//         path: "stopwatch",
//         element: <Stopwatch />,
//       },

//       {
//         path: "crud",
//         element: <Students />,
//       },
//       {
//         path: "crud/add",
//         element: <AddStudent />,
//       },
//       {
//         path: "crud/edit/:id",
//         element: <EditStudent />,
//       },
//       {
//         path: "details/:id",
//         element: <StudentDetails />,
//       },
//     ],
//   },
// ]);

// export default Routes;



import { createBrowserRouter } from "react-router-dom";

import Wrapper from "../layouts/Wrapper";
import Stopwatch from "../pages/Stopwatch";
import Students from "../pages/Students";
import StudentDetails from "../pages/StudentDetails";
import ProductForm from "../pages/ProductForm";
import AddStudent from "../pages/AddStudent";
import EditStudent from "../pages/EditStudent";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Wrapper />,
    children: [
      {
        path: "/",
        element: <ProductForm />,
      },
      {
        path: "stopwatch",
        element: <Stopwatch />,
      },
      {
        path: "crud",
        element: <Students />,
      },
      {
        path: "crud/add",
        element: <AddStudent />,
      },
      {
        path: "crud/edit/:id",
        element: <EditStudent />,
      },
      {
        path: "details/:id",
        element: <StudentDetails />,
      },
    ],
  },
]);

export default Routes;
