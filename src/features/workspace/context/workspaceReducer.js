/**
 * WORKSPACE REDUCER
 * State management pour le workspace
 */

export const initialState = {
  projects: [],
  tasks: [],
  team: [],
  events: [],
  ui: {
    sidebarOpen: false,
    searchQuery: '',
    viewMode: 'board',
    activeModal: null,
    demoLoaded: false,
  },
};

export function workspaceReducer(state, action) {
  switch (action.type) {
    // Projects
    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };

    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map(p =>
          p.id === action.payload.id ? action.payload : p
        ),
      };

    case 'DELETE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter(p => p.id !== action.payload),
      };

    // Tasks
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(t =>
          t.id === action.payload.id ? action.payload : t
        ),
      };

    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(t => t.id !== action.payload),
      };

    // Team
    case 'ADD_TEAM_MEMBER':
      return {
        ...state,
        team: [...state.team, action.payload],
      };

    case 'UPDATE_TEAM_MEMBER':
      return {
        ...state,
        team: state.team.map(m =>
          m.id === action.payload.id ? action.payload : m
        ),
      };

    case 'REMOVE_TEAM_MEMBER':
      return {
        ...state,
        team: state.team.filter(m => m.id !== action.payload),
      };

    // Events
    case 'ADD_EVENT':
      return {
        ...state,
        events: [...state.events, action.payload],
      };

    case 'UPDATE_EVENT':
      return {
        ...state,
        events: state.events.map(e =>
          e.id === action.payload.id ? action.payload : e
        ),
      };

    case 'DELETE_EVENT':
      return {
        ...state,
        events: state.events.filter(e => e.id !== action.payload),
      };

    // UI
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        ui: { ...state.ui, sidebarOpen: !state.ui.sidebarOpen },
      };

    case 'SET_SIDEBAR_OPEN':
      return {
        ...state,
        ui: { ...state.ui, sidebarOpen: action.payload },
      };

    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        ui: { ...state.ui, searchQuery: action.payload },
      };

    case 'SET_VIEW_MODE':
      return {
        ...state,
        ui: { ...state.ui, viewMode: action.payload },
      };

    case 'OPEN_MODAL':
      return {
        ...state,
        ui: { ...state.ui, activeModal: action.payload },
      };

    case 'CLOSE_MODAL':
      return {
        ...state,
        ui: { ...state.ui, activeModal: null },
      };

    case 'SET_DEMO_LOADED':
      return {
        ...state,
        ui: { ...state.ui, demoLoaded: action.payload },
      };

    // Data loading
    case 'LOAD_DATA':
      return {
        ...state,
        projects: action.payload.projects || [],
        tasks: action.payload.tasks || [],
        team: action.payload.team || [],
        events: action.payload.events || [],
        ui: { ...state.ui, demoLoaded: true },
      };

    case 'CLEAR_ALL_DATA':
      return {
        ...initialState,
        ui: { ...initialState.ui, demoLoaded: false },
      };

    default:
      return state;
  }
}
