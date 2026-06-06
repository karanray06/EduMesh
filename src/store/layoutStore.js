import { create } from 'zustand';

export const useLayoutStore = create((set) => ({
 sidebarOpen: false,
 sidebarCollapsed: false,

 toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
 openSidebar: () => set({ sidebarOpen: true }),
 closeSidebar: () => set({ sidebarOpen: false }),
 toggleCollapse: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
}));
