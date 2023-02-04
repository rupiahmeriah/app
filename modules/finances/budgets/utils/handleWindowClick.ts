import { SupabaseClient } from "@supabase/supabase-js";
import { Dispatch, SetStateAction } from "react";
import { Database } from "../../../../types/supabase";
import {
  CategoryEditStatusType,
  UserBudgetsCategory,
} from "../components/BudgetsTable";

export const handleWindowClick = async (
  event: MouseEvent,
  supabase: SupabaseClient<Database>,
  categoryBeingEdited: string | undefined,
  categoryEditStatus: CategoryEditStatusType | undefined,
  setBudgets: Dispatch<SetStateAction<UserBudgetsCategory[] | undefined>>,
  updateBudget: (categoryName: string, budget: number) => void,
  setCategoryBeingEdited: Dispatch<SetStateAction<string | undefined>>
) => {
  if (event.target instanceof HTMLElement) {
    const focusedCategory = event.target.id;

    const isInput = event.target instanceof HTMLInputElement;

    if (isInput) {
      return;
    }

    if (
      event.target.classList.contains(
        `${focusedCategory.replace(/\s/g, "-")}-budget`
      )
    ) {
      setCategoryBeingEdited(focusedCategory);
    } else if (categoryBeingEdited?.length) {
      const currCategory = categoryEditStatus![categoryBeingEdited!];

      const { data, error } = await supabase
        .from("user_budgets")
        .update({
          budget: currCategory.budget,
          remaining: currCategory.remaining,
        })
        .filter("id", "eq", currCategory.id)
        .select();

      if (error) {
        console.log(error);
        return;
      }

      if (data) {
        //   call setBudgets to update the table
        setBudgets((prev) => {
          if (!prev) return prev;
          return prev.map((category) => {
            if (category.name === categoryBeingEdited) {
              return {
                ...category,
                user_budgets: [
                  {
                    ...category.user_budgets[0],
                    budget: currCategory.budget,
                    remaining: currCategory.remaining,
                  },
                  {
                    ...category.user_budgets[1],
                  },
                ],
              };
            }
            return category;
          });
        });

        updateBudget(categoryBeingEdited!, currCategory.budget);
      }

      setCategoryBeingEdited("");
    }
  }
};
