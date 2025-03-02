import { Activity } from "../types";

export type ActivityActions =
  | {
      type: "save-activity";
      payload: { newActivity: Activity };
    }
  | {
      type: "set-activiteId";
      payload: { id: Activity["id"] };
    }
  | { type: "delete-activity"; payload: { id: Activity["id"] } }
  | { type: "reset-app" };

export type ActivityState = {
  activities: Activity[];
  activeId: Activity["id"];
};

const localStorageActivities = (): Activity[] => {
  const activities = localStorage.getItem("activities");
  return activities ? JSON.parse(activities) : [];
};

export const initialState: ActivityState = {
  activities: localStorageActivities(),
  activeId: "",
};

export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
) => {
  if (action.type === "save-activity") {
    let updateActivities: Activity[] = [];
    if (state.activeId) {
      updateActivities = state.activities.map((activity) =>
        activity.id === state.activeId ? action.payload.newActivity : activity
      );
    } else {
      updateActivities = [...state.activities, action.payload.newActivity];
    }
    return {
      ...state,
      activities: updateActivities,
    };
  }
  if (action.type === "set-activiteId") {
    // Este codigo maneja la logica para actualizar el state
    return {
      ...state,
      activeId: action.payload.id,
    };
  }
  if (action.type === "delete-activity") {
    return {
      ...state,
      activities: state.activities.filter(
        (activity) => activity.id !== action.payload.id
      ),
    };
  }
  if (action.type === "reset-app") {
    return {
      activities: [],
      activeId: "",
    };
  }
  return state;
};
