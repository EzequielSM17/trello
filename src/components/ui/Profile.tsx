import { useEffect, useState } from "react";
import { GetAuthMeData, logOut } from "../../utils/api";
import Notification from "./Notification";
import { NOTIFICATIONS_TYPES } from "../../const";

function Profile() {
  const [user, setUser] = useState<User>({ email: "", id: null });
  const [notificacion, setNotificacion] = useState<MyNotification>({
    type: "",
    text: "",
  });
  const onClick = () => {
    if (!user.id) {
      window.location.href = window.location.href + "login/";
    }
  };

  async function onClickLogOutButton() {
    const notificacion = await logOut();
    setNotificacion(notificacion);
    if (notificacion.type === NOTIFICATIONS_TYPES.success) {
      setUser({ email: "", id: null });
    }
    setTimeout(() => {
      setNotificacion({
        type: "",
        text: "",
      });
    }, 5000);
  }

  useEffect(() => {
    GetAuthMeData(setUser);
  }, [setUser, GetAuthMeData]);
  return (
    <div className="mx-5 flex flex-row gap-3 items-center ">
      {notificacion.type && (
        <Notification type={notificacion.type} text={notificacion.text} />
      )}
      {user && <p>{user.email}</p>}
      <aside>
        {user.id && (
          <div className="absolute h-10 w-10 opacity-0 hover:opacity-100 hover:pt-12 hover:min-w-44 hover:right-4 hover:h-auto transition-all z-10 ">
            <ul className="flex flex-col bg-gray-800 border border-gray-600 rounded-lg w-full overflow-hidden">
              <li className="">
                <button
                  onClick={onClickLogOutButton}
                  className="m-3 text-red-600 font-bold flex flex-row gap-2 overflow-hidden"
                >
                  <span>Cerrar session</span>
                  <img
                    src="/logout.svg"
                    alt="imagen de cerrar sesion"
                    className=""
                  />
                </button>
              </li>
            </ul>
          </div>
        )}
        <button onClick={onClick}>
          <img
            src="/user.svg"
            alt="imagen de usuario"
            className="rounded-full h-10 w-10 border border-white p-1 "
          />
        </button>
      </aside>
    </div>
  );
}

export default Profile;
