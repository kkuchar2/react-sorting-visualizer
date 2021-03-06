import { CheckSortPause, IsAborted, mark, notifySortUpdate, sortState, unmark } from "../worker.utils";

export const insertionSort = async () => {
    let length = sortState.data.length;
    for (let i = 1; i < length; i++) {

        await CheckSortPause();

        if (IsAborted()) {
            return;
        }

        mark(i, 2);

        let key = sortState.data[i];
        let j = i - 1;

        while (j >= 0 && sortState.data[j] > key) {
            sortState.data[j + 1] = sortState.data[j];
            mark(j, 0);
            notifySortUpdate();
            j = j - 1;
        }
        sortState.data[j + 1] = key;

        unmark(i);
    }
};