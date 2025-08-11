import { configureStore } from "@reduxjs/toolkit";
import { newsApi } from "./NewsApi/newsApi";
import { bannerApi } from "./BannerApi/bannerApi";
import { counterApi } from "./CounterApi/counterApi";
import { vendingMachineApi } from "./VendingMachine/vendingMachineApi";
import { eventsApi } from "./EventsApi/eventsApi";
import { videosApi } from "./VideosApi/videosApi";
import { galleryApi } from "./GalleryApi/galleryApi";
import { departmentsApi } from "./DepartmentsApi/departmentsApi";
import { awardsApi } from "./AwardsApi/awardsApi";



export const store = configureStore({
  reducer: {
    [newsApi.reducerPath]: newsApi.reducer,
    [bannerApi.reducerPath]: bannerApi.reducer,
    [counterApi.reducerPath]: counterApi.reducer,
    [vendingMachineApi.reducerPath]: vendingMachineApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
    [videosApi.reducerPath]: videosApi.reducer,
    [galleryApi.reducerPath]: galleryApi.reducer,
    [departmentsApi.reducerPath]: departmentsApi.reducer, 
    [awardsApi.reducerPath]: awardsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
        newsApi.middleware,
        bannerApi.middleware,
        counterApi.middleware,
        vendingMachineApi.middleware,
        eventsApi.middleware,
        videosApi.middleware,
        galleryApi.middleware,
        departmentsApi.middleware,
        awardsApi.middleware,
    ]),
   

});
