import { vm }  from './global-event'

export const onMobileMode = (action) => {
  vm.$on('mobile-mode', (id)=>{ 
    action(id);      
  });
}
export const onDesktopMode = (action) => {
  vm.$on('desktop-mode', (id)=>{ 
    action(id);      
  });
}

export const onCategoryDetailsEvent = (action) =>  {
  vm.$on('category-details-event', (id)=>{ 
    action(id);      
  });
}
export const onAddCategoryEvent = (action) =>  {
  vm.$on('add-category-event', (id)=>{ 
    action(id);
  });
}

export const onStopLiveModeEvent = (action) => {
  vm.$on('stop-live-mode-event', (id)=>{ 
    action(id);      
  });
}
export const onStartLiveModeEvent = (action) => {
  vm.$on('start-live-mode-event', (id)=>{ 
    action(id);      
  });
}
export const onUpdateCartEvent = (action) =>  {
  vm.$on('update-cart-event', (id)=>{ 
    action(id);
  });
}
export const onUpdateDriversLocationsEvent = (action) =>  {
  vm.$on('update-drivers-locations-event', (id)=>{ 
    action(id);
  });
}
