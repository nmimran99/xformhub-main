import { useContext } from "react";
import { SnackbarContext } from "../../contexts/SnackbarContext";

export default function useSnackbar() {
	const { snackbar, setSnackbar } = useContext(SnackbarContext);

	return { snackbar, setSnackbar };
}
