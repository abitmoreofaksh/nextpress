// "use client";
// import { useState } from "react";
// import { AddDialog } from "./Dialog";
// import { Edit, Link2, Trash2 } from "lucide-react";
// import Link from "next/link";
// import { toast } from "sonner";
// import axios from "axios";

// const AddDialog = ({ onSuccess, urls }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const onClose = () => {
//     setIsOpen(false);
//   };
//   const handleDelete = async (id) => {
//     try {
//       const { data } = await axios.delete(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/nextpress/delete-url/${id}`,
//         {
//           withCredentials: true,
//         }
//       );
//       toast.success(data.message);
//       onSuccess();
//     } catch (err) {
//       console.log(err);
//       toast.error(err.response.data.message);
//     }
//   };
//   return (
//     <>
//       <Dialog isOpen={isOpen} onClose={onClose} onSuccess={onSuccess} />
//       <div className="h-screen">
//         <div>
//           <button
//             onClick={() => setIsOpen(true)}
//             className="px-6 py-3 bg-blue-100 text-blue-600 font-medium rounded-lg hover:bg-blue-200 transition duration-300"
//           >
//             Add Url
//           </button>
//         </div>
//         <div className="grid grid-cols-5 items-center gap-4">
//           {urls?.map((item, index) => (
//             <div
//               className="px-4 py-1 border border-neutral-400 flex items-center justify-between "
//               key={index}
//             >
//               {item.url}
//               <Link
//                 className="border border-neutral-400 rounded p-2"
//                 href={`/editor/${item.url}`}
//               >
//                 <Edit className="w-4 h-4" />
//               </Link>
//               <Link
//                 className="border border-neutral-400 rounded p-2"
//                 href={`/preview/${item.url}`}
//               >
//                 <Link2 className="w-4 h-4" />
//               </Link>
//               <button
//                 className="border border-neutral-400 rounded p-2"
//                 onClick={() => handleDelete(item._id)}
//               >
//                 <Trash2 className="w-4 h-4" />
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddDialog;

import React from "react";

const AddDialog = () => {
  return <div>AddDialog</div>;
};

export default AddDialog;
