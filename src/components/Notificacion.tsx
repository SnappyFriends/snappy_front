import React from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";

interface CustomToastProps {
  sender: string;
  message: string;
  type: "success" | "error";
}

const CustomToast: React.FC<CustomToastProps> = ({ sender, message, type }) => {
  const toastStyles =
    type === "success"
      ? "max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5"
      : "max-w-md w-full bg-red-100 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5";

  const buttonStyles =
    type === "success"
      ? "w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      : "w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-red-600 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500";

  return (
    <div className={toastStyles}>
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <Image
            className="h-10 w-10 rounded-full"
            src="/favicon.ico"
            alt="User Avatar"
            width={40}
            height={40}
          />
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">{sender}</p>
            <p className="mt-1 text-sm text-gray-500">{message}</p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button onClick={() => toast.dismiss()} className={buttonStyles}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export const showCustomToast = (
  sender: string,
  message: string,
  type: "success" | "error",
  duration: number = 1000
) => {
  toast.custom(
    () => <CustomToast sender={sender} message={message} type={type} />,
    { duration }
  );
};

export default CustomToast;
