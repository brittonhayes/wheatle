interface ToastNotificationProps {
  message: string
}

export function ToastNotification({ message }: ToastNotificationProps) {
  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg z-50">
      {message}
    </div>
  )
}
