import { NativeDateAdapter } from "native-date-adapter";

const dateHandler = NativeDateAdapter.setLocale('fa-IR');
const iranianDate = new dateHandler();
