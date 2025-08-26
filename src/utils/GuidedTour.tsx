import { useReducer, useEffect } from "react";
import Joyride, { ACTIONS, EVENTS, STATUS } from "react-joyride";

const TOUR_KEY = "hasSeenAppTour";

//   const handleRestartTour = () => {
//     localStorage.removeItem("hasSeenAppTour");
//     window.location.reload();
//   };

const TOUR_STEPS = [
  //   {
  //     target: ".nav-menu",
  //     content: "Use this navigation menu to switch sections instantly!",
  //     disableBeacon: true,
  //   },
  {
    target: "#tour-home",
    content: "Welcome! Use this to quickly navigate the Home at any time.",
    disableBeacon: true,
  },
  {
    target: "#tour-about",
    content: "Learn more about The e-wallet",
  },
  {
    target: "#tour-features",
    content: "Explore the main features of The e-wallet",
  },
  {
    target: "#tour-contact",
    content:
      "Need assistance? Visit the Contact page to get in touch with our support team.",
  },
  {
    target: "#tour-faq",
    content: "Find answers to common questions in our FAQ section.",
  },

  {
    target: "#tour-theme-toggle",
    content: "Toggle between light and dark themes!",
  },
  {
    target: "#tour-info-dropdown-button",
    content: "Access helpful options here, including restarting the tour",
  },
];

const INITIAL_STATE = {
  key: new Date(),
  run: false,
  stepIndex: 0,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function reducer(state: any, action: any) {
  switch (action.type) {
    case "START":
      return { ...state, run: true };
    case "STOP":
      return { ...state, run: false };
    case "RESTART":
      return { ...state, run: true, stepIndex: 0, key: new Date() };
    case "NEXT":
      return { ...state, stepIndex: action.stepIndex };
    default:
      return state;
  }
}

const GuidedTour = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    if (!localStorage.getItem(TOUR_KEY)) {
      dispatch({ type: "START" });
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const callback = (data: any) => {
    const { status, type, index, action } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      localStorage.setItem(TOUR_KEY, "true");
      dispatch({ type: "STOP" });
    } else if (type === EVENTS.STEP_AFTER) {
      dispatch({
        type: "NEXT",
        stepIndex: index + (action === ACTIONS.PREV ? -1 : 1),
      });
    }
  };

  return (
    <Joyride
      key={state.key}
      steps={TOUR_STEPS}
      run={state.run}
      stepIndex={state.stepIndex}
      callback={callback}
      continuous
      showSkipButton
      showProgress
      scrollToFirstStep
      hideCloseButton={true}
      styles={{
        options: {
          arrowColor: "#c3acf9",
          backgroundColor: "#19163a",
          overlayColor: "rgba(0, 0, 0, 0.5)",
          primaryColor: "#6366f1",
          textColor: "#fff",
          //   width: 300,
          width: window.innerWidth < 480 ? "90%" : 300,

          zIndex: 1000,
        },
        tooltipContainer: {
          textAlign: "left",
          borderRadius: "8px",

          fontSize: window.innerWidth < 480 ? "14px" : "16px",
        },
        //
        buttonNext: {
          backgroundColor: "#22c55e",
          color: "#fff",
        },
        buttonBack: {
          backgroundColor: "#22c55e",
          color: "#fff",
        },
        buttonSkip: {
          color: "#f87171",
        },

        //
      }}
      locale={{
        back: "Previous",
        next: "Next",
        skip: "Skip",
        last: "🎉 Finish Tour",
      }}
    />
  );
};

export default GuidedTour;
