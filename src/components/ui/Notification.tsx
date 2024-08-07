function Notification({ type, text }: MyNotification) {
  return (
    <div
      className={
        "absolute p-4 min-w-44 min-h-24 top-4 notification rounded-lg font-bold text-lg flex items-center z-50 " +
        type
      }
    >
      <p className="w-full h-full text-center">{text}</p>
    </div>
  );
}

export default Notification;
