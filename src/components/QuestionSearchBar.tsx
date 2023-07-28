import { useState } from "react";
import FormInput from "./form/FormInput";
import FormButton from "./form/FormButton";
import { api, apiErrorAlert } from "~/utils/api";
import { type Question as dbQuestion } from "@prisma/client";
import Question from "./Question";

interface Props {
  onSearchDone: (results: dbQuestion) => void;
}

export default function QuestionSearchBar({ onSearchDone }: Props) {
  const [query, querySet] = useState("");
  const [submittingForm, submittingFormSet] = useState(false);
  const [searchResultQuestion, resultsSet] = useState<dbQuestion | undefined>(
    undefined
  );

  const { mutate: searchMutation } = api.questions.search.useMutation({
    onMutate: () => {
      submittingFormSet(true);
    },
    onSuccess: (result) => {
      if (!result) {
        return;
      }
      onSearchDone(result);
      resultsSet(result);
    },
    onError: (e) => {
      apiErrorAlert(e.data?.zodError?.fieldErrors.content?.[0]);
    },
    onSettled: () => {
      submittingFormSet(false);
    },
  });

  return (
    <div>
      <form className="flex flex-col gap-1">
        <FormInput
          type="text"
          label="Search"
          value={query}
          onChange={(e) => querySet(e.target.value)}
        />
        <FormButton
          label="Search"
          disabled={submittingForm}
          onClick={(e) => {
            e.preventDefault();
            searchMutation(query);
          }}
        />
      </form>
      {searchResultQuestion && (
        <>
          <p className="my-2">Search results</p>
          <Question data={searchResultQuestion} />
        </>
      )}
    </div>
  );
}
