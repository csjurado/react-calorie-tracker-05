import { createContext, ReactNode, useReducer, Dispatch, useMemo } from "react";
import {
  activityReducer,
  initialState,
  ActivityState,
  ActivityActions,
} from "../reducers/activity-reducer";
import { Activity } from "../types";
import { categories } from "../data/categories";

type ActivityProviderProps = {
  children: ReactNode;
};

type ActivityContextProps = {
  state: ActivityState;
  dispatch: Dispatch<ActivityActions>;
  caloriesConsumed: number;
  caloriesBurned: number;
  netCarlories: number;
  categoryName: (category: Activity["category"]) => string[];
  isEmptyActivities: boolean;
};

export const ActivityContext = createContext<ActivityContextProps>(null!);

export const ActivityProvider = ({ children }: ActivityProviderProps) => {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  const caloriesConsumed = useMemo(
    () =>
      state.activities.reduce(
        (total, activity) =>
          activity.category === 1 ? total + activity.calories : total,
        0
      ),
    [state.activities]
  );
  const caloriesBurned = useMemo(
    () =>
      state.activities.reduce(
        (total, activity) =>
          activity.category === 2 ? total + activity.calories : total,
        0
      ),
    [state.activities]
  );
  const netCarlories = useMemo(
    () => caloriesConsumed - caloriesBurned,
    [state.activities]
  );

  const categoryName = useMemo(
    () => (category: Activity["category"]) =>
      categories.map((cat) => (cat.id === category ? cat.name : "")),
    [state.activities]
  );

  const isEmptyActivities = useMemo(
    () => state.activities.length === 0,
    [state.activities]
  );
  return (
    <ActivityContext.Provider
      value={{
        state,
        dispatch,
        caloriesConsumed,
        caloriesBurned,
        netCarlories,
        categoryName,
        isEmptyActivities,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};
