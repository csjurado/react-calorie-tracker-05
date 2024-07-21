import CalorieDisplay from "./CalorieDisplay";
import { useAcivity } from "../hooks/UseActivity";

const CalorieTracker = () => {
  const { caloriesConsumed, caloriesBurned, netCarlories } = useAcivity();

  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">
        {" "}
        Resumen de Calorias
      </h2>
      <div className=" flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CalorieDisplay calories={caloriesConsumed} text={"Consumidas"} />
        <CalorieDisplay calories={caloriesBurned} text={"Ejercicio"} />
        <CalorieDisplay calories={netCarlories} text={"Diferencia"} />
      </div>
    </>
  );
};

export default CalorieTracker;
