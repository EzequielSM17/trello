import { NOTIFICATIONS_TYPES } from "../const";

export async function getCookie(key: string) {
  const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}
export function delete_cookie(name: string) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
async function getAuthHeader() {
  try {
    const token = await getCookie("trello_bff_token");
    return {
      Authorization: "Bearer " + token,
    };
  } catch (error) {
    console.log(error);
    return {
      Authorization: " ",
    };
  }
}
export const GetAuthMeData = async (setUser: Function) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/auth/users/me/", {
      credentials: "include",
      headers: {
        ...(await getAuthHeader()),
      },
    });
    if (response.ok) {
      const data = await response.json();
      setUser(data);
      return data;
    }
    return { email: "", id: null };

    // Manejar los datos recibidos
  } catch (error) {
    console.error("Error fetching data:", error); // Manejar errores
  }
};

export async function logOut() {
  try {
    const response = await fetch("http://127.0.0.1:8000/auth/token/logout/", {
      method: "POST",
      credentials: "include",
      headers: {
        ...(await getAuthHeader()),
      },
    });

    if (response.ok) {
      delete_cookie("trello_bff_token");
      return {
        type: NOTIFICATIONS_TYPES.success,
        text: "Se ha cerrado sesión correctamente",
      };
    }
    if (response.status === 401) {
      delete_cookie("trello_bff_token");
      return {
        type: NOTIFICATIONS_TYPES.success,
        text: "Se ha cerrado sesión correctamente",
      };
    }
    return {
      type: NOTIFICATIONS_TYPES.danger,
      text: "No se ha podido cerrar sesión, inténtalo mas tarde",
    };
  } catch (error) {
    return {
      type: NOTIFICATIONS_TYPES.danger,
      text: "Ha sucedido un problema inesperado, inténtalo mas tarde",
    };
  }
}
export async function getToDoStates() {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/todos/todo_state/");

    if (response.ok) {
      const data = await response.json();
      return {
        data: data,
        notification: {
          type: "",
          text: "",
          error: null,
        },
      };
    }
    return {
      data: null,
      notification: {
        type: NOTIFICATIONS_TYPES.danger,
        text: "No se ha podido traer los estados de las tareas, inténtalo mas tarde",
        error: response.status,
      },
    };
  } catch (error) {
    return {
      data: null,
      notification: {
        type: NOTIFICATIONS_TYPES.danger,
        text: "Ha sucedido un problema inesperado, inténtalo mas tarde",
        error: error,
      },
    };
  }
}
export async function getToDoTypes() {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/todos/todo_types/");

    if (response.ok) {
      const data = await response.json();
      return {
        data: data,
        notification: {
          type: "",
          text: "",
          error: null,
        },
      };
    }
    return {
      data: null,
      notification: {
        type: NOTIFICATIONS_TYPES.danger,
        text: "No se ha podido traer los tipo de prioridad, inténtalo mas tarde",
        error: response.status,
      },
    };
  } catch (error) {
    return {
      data: null,
      notification: {
        type: NOTIFICATIONS_TYPES.danger,
        text: "Ha sucedido un problema inesperado, inténtalo mas tarde",
        error: error,
      },
    };
  }
}
export async function getToDos(type: string, setToDos: Function) {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/todos/todo_specific_state/" + type,
      {
        credentials: "include",
        headers: {
          ...(await getAuthHeader()),
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      await setToDos(data);
      return {
        notification: {
          type: "",
          text: "",
          error: null,
        },
      };
    }

    return {
      notification: {
        type: NOTIFICATIONS_TYPES.danger,
        text: "No se ha podido traer las tareas, inténtalo mas tarde",
        error: response.status,
      },
    };
  } catch (error) {
    return {
      data: null,
      notification: {
        type: NOTIFICATIONS_TYPES.danger,
        text: "Ha sucedido un problema inesperado, inténtalo mas tarde",
        error: error,
      },
    };
  }
}
export async function updateToDo(
  id: string,
  body: any,
  token: string | null | undefined
) {
  try {
    let auth = token
      ? { Authorization: "Bearer " + token }
      : await getAuthHeader();

    const response = await fetch(
      "http://127.0.0.1:8000/api/todos/todos/" + id + "/",
      {
        method: "PATCH",
        credentials: "include",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          ...auth,
        },
      }
    );

    if (response.ok) {
      return {
        data: null,
        notification: {
          type: NOTIFICATIONS_TYPES.success,
          text: "Correcto",
          error: null,
        },
      };
    }

    return {
      data: null,
      notification: {
        type: NOTIFICATIONS_TYPES.danger,
        text: "No se ha podido traer las tareas, inténtalo mas tarde",
        error: response.status,
      },
    };
  } catch (error) {
    return {
      data: null,
      notification: {
        type: NOTIFICATIONS_TYPES.danger,
        text: "Ha sucedido un problema inesperado, inténtalo mas tarde",
        error: error,
      },
    };
  }
}
export async function createToDo(body: any, token: string | undefined) {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/todos/todos/", {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      return {
        type: NOTIFICATIONS_TYPES.success,
        text: "Se ha creado la tarea correctamente",
      };
    }
    if (response.status === 401) {
      return {
        type: NOTIFICATIONS_TYPES.danger,
        text: "No has iniciado sesión o no tienes permiso para esto",
      };
    }
    return {
      type: NOTIFICATIONS_TYPES.danger,
      text: "No se ha creado la tarea, inténtalo mas tarde",
    };
  } catch (error) {
    return {
      type: NOTIFICATIONS_TYPES.danger,
      text: "Ha sucedido un problema inesperado, inténtalo mas tarde",
    };
  }
}
export async function deleteToDo(id: string) {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/todos/todos/" + id + "/",
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          ...(await getAuthHeader()),
        },
      }
    );

    if (response.ok) {
      return {
        notification: {
          type: "",
          text: "",
          error: null,
        },
      };
    }

    return {
      notification: {
        type: NOTIFICATIONS_TYPES.danger,
        text: "No se ha podido traer las tareas, inténtalo mas tarde",
        error: response.status,
      },
    };
  } catch (error) {
    return {
      data: null,
      notification: {
        type: NOTIFICATIONS_TYPES.danger,
        text: "Ha sucedido un problema inesperado, inténtalo mas tarde",
        error: error,
      },
    };
  }
}
export async function getToDoById(
  id: string | undefined,
  token: string | undefined
) {
  try {
    if (!id) {
      return {
        data: null,
        notification: {
          type: NOTIFICATIONS_TYPES.danger,
          text: "No se ha podido traer la tarea, inténtalo mas tarde",
          error: "No hay id",
        },
      };
    }
    const response = await fetch(
      "http://127.0.0.1:8000/api/todos/todos/" + id,
      {
        credentials: "include",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return {
        data: data,
        notification: {
          type: "",
          text: "",
          error: null,
        },
      };
    }
    return {
      data: null,
      notification: {
        type: NOTIFICATIONS_TYPES.danger,
        text: "No se ha podido traer la tarea, inténtalo mas tarde",
        error: response.status,
      },
    };
  } catch (error) {
    return {
      data: null,
      notification: {
        type: NOTIFICATIONS_TYPES.danger,
        text: "Ha sucedido un problema inesperado, inténtalo mas tarde",
        error: error,
      },
    };
  }
}
