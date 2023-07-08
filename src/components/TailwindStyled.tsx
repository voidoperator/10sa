import tw from 'tailwind-styled-components';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { StylesConfig } from 'react-select';
import type { OptionTypes } from '@/types/formData';

// Auth Form
export const GenericContainer = tw.div`
  block
`;
export const ErrorLabelContainer = tw.div`
  absolute flex items-center justify-end top-0 left-1/2
`;
export const ErrorText = tw.span`
  bg-[#e05823] px-3 py-2 rounded-lg text-dp-text-primary text-sm font-medium absolute left-1/2 bottom-full -translate-x-1/2 -translate-y-2 whitespace-nowrap pointer-events-none select-none
`;
export const ErrorLabelArrow = tw.span`
  before:content-[""] absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-8 border-solid border-transparent border-t-[#e05823]
`;

// Globals
export const MainLabel = tw.label`
  block mb-2 text-sm font-semibold text-dp-text-primary select-none
`;
export const MainLabelSpan = tw.span`
  block mb-2 text-sm font-semibold text-dp-text-primary cursor-default
`;
export const SubLabel = tw.label`
  focus:border-blue-600 border text-sm rounded-lg block w-full p-2.5 bg-dp-secondary border-dp-hint/0 placeholder-dp-placeholder-text
`;
export const SubLabelSpan = tw.span`
  focus:border-blue-600 border text-sm rounded-lg block w-full p-2.5 bg-dp-secondary border-dp-hint/0 placeholder-dp-placeholder-text font-medium
`;
export const RequiredSpan = tw.span`
  ml-1 after:content-["*"] after:text-yellow-600
`;
export const ShadowDiv = tw.div`
  flex flex-col shadow-xl border-dp-hint/5 rounded-xl p-4 border gap-2 bg-dp-primary
`;
export const ShadowDivRow = tw.div`
  flex flex-row shadow-xl border-dp-hint/5 rounded-xl p-4 border gap-2 bg-dp-primary font-semibold text-sm justify-start
`;
export const Divider = tw.div`
  h-[1px] w-full bg-dp-hint/75 my-0 sm:my-10 hidden sm:block
`;
export const AgentInfoBox = tw.div`
  flex flex-col shadow-xl border-dp-hint/5 rounded-xl px-4 py-6 border gap-6 mt-6 bg-dp-primary
`;
export const ScriptBox = tw(motion.div)`
  rounded-[50px] shadow-xl text-dp-primary font-medium
`;
export const Break = tw(motion.br)``;
export const MotionDiv = tw(motion.div)``;

// Paywall
export const PaywallSection = tw.section`
  4xl:max-w-4xl 3xl:max-w-3xl xl:max-w-xl lg:max-w-lg md:max-w-md sm:max-w-sm w-full p-4 bg-dp-form-color rounded-lg shadow sm:p-6 md:p-8
`;
export const ErrorToast = tw.div`
  flex flex-col shadow-xl rounded-xl p-4 border gap-2 bg-orange-600 text-dp-text-secondary font-medium border-orange-700/75 select-none text-sm
`;
export const SuccessToast = tw.div`
  flex flex-col shadow-xl rounded-xl p-4 border gap-2 bg-green-600 text-dp-text-secondary font-medium border-green-700/75 select-none text-sm
`;
export const QuestionButton = tw.button`
  underline text-blue-600 hover:text-blue-200 transition-colors font-medium select-none
`;
export const NextLink = tw(Link)`
  underline text-blue-600 hover:text-blue-800 transition-colors font-medium
`;
export const SmallParagraph = tw.p`
  text-sm select-none
`;

// TopNav
export const TopNavContainer = tw.nav`
  bg-dp-primary w-screen h-[50px] fixed top-0 left-0 z-[99999] border-b border-dp-hint/5 shadow-lg shadow-dp-primary/10 font-semibold
`;
export const NavWrapper = tw.div`
  w-full h-full flex flex-row justify-evenly items-center
`;
export const PhonyAnchor = tw.div`
  hover:opacity-60 flex items-center justify-center w-full h-full text-xs text-center transition-all duration-300 rounded-full cursor-pointer select-none
`;
export const VerticalDivider = tw.div`
  h-[36px] w-[1px] bg-dp-hint/30 rounded-full select-none
`;
export const ToggleContainer = tw.div`
  flex flex-col items-center justify-center
`;

// SideNav
export const SideNavContainer = tw.div`
  relative w-[10svw] min-h-screen
`;
export const SymbolContainer = tw.div`
  flex flex-col gap-8 fixed top-[100px] left-8
`;
export const AutoSymbolContainer = tw.div`
  flex flex-col gap-8 fixed bottom-8 left-8
`;
export const Anchor = tw.a`
  group bg-white/90 transition-all rounded-full p-2 inline-flex items-center relative
`;
export const AnchorSpan = tw.span`
  text-dp-text-primary font-semibold absolute transition-all transform -translate-x-8 -translate-y-1/2 top-1/2 w-0 overflow-hidden whitespace-nowrap group-hover:translate-x-14 group-hover:w-auto group-hover:opacity-100 opacity-0
`;
export const DownloadsContainer = tw.div`
  flex flex-col gap-8 fixed top-1/2 left-8
`;

// Form
export const FormSectionContainer = tw.section`
  4xl:max-w-4xl 3xl:max-w-3xl xl:max-w-xl lg:max-w-lg md:max-w-md sm:max-w-sm w-full p-4 bg-dp-form-color rounded-lg shadow sm:p-6 md:p-8 my-20
`;
export const HeadingSrOnly = tw.h1`
  cursor-default text-2xl text-dp-text-primary text-center sr-only
`;
export const FormTag = tw.form`
  space-y-6
`;
export const LogoContainer = tw.div`
  flex items-center justify-center
`;
export const ButtonContainer = tw.div`
  w-full inline-flex gap-4
`;
export const Button = tw.button`
  disabled:bg-neutral-500 disabled:text-neutral-200 hover:bg-green-600 bg-blue-500 border active:bg-blue-500/100 w-full transition-all text-white hover:text-neutral-900 focus:ring-4 focus:outline-none font-medium hover:font-semibold disabled:hover:font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-blue-800 select-none disabled:cursor-not-allowed
`;
export const H2 = tw.h2`
  cursor-default text-xl font-medium text-dp-text-primary select-none
`;
export const GoogleButtonContainer = tw.div`
  flex items-center justify-center gap-6
`;
export const AddDependentContainer = tw.div`
  flex items-center justify-center gap-6
`;
export const AddDependentButton = tw.button`
  bg-blue-500 text-dp-text-secondary hover:bg-green-600 hover:text-dp-text-primary mx-6 w-1/2 transition-all disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:hover:text-dp-text-secondary disabled:cursor-not-allowed shadow-xl focus:ring-4 focus:outline-none font-medium rounded-full text-sm py-2.5 text-center focus:ring-blue-800
`;
export const ExternalAnchorButton = tw.a`
  bg-blue-500 text-dp-text-secondary hover:bg-green-600 hover:text-dp-text-primary mx-6 w-1/2 transition-all disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:hover:text-dp-text-secondary disabled:cursor-not-allowed shadow-xl focus:ring-4 focus:outline-none font-medium rounded-full text-sm py-2.5 text-center focus:ring-blue-800
`;
export const RemoveDependentButton = tw.button`
  w-6 absolute top-1 right-1 opacity-70 hover:opacity-100 transition-all
`;
export const AdditionalInsuredContainer = tw.div`
  flex relative flex-col gap-4 px-6 py-5 border rounded-xl border-dp-hint/5 w-full h-full mt-6 bg-dp-primary shadow-xl
`;
export const EligibilityIconContainer = tw.div`
  flex items-center justify-center text-dp-text-primary
`;

// Summary
export const SummarySection = tw.section`
  relative z-50 min-h-screen w-1/4
`;
export const SummaryContainer = tw.div`
  flex flex-col gap-4 fixed top-0 h-full w-1/4 bg-dp-form-color right-0 border-l border-dp-hint/10 px-4 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-dp-hint scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-track-dp-secondary
`;
export const SummaryUl = tw.ul`
  flex flex-wrap gap-2 justify-center pt-3
`;
export const SummaryLi = tw.li`
  rounded-full px-3 font-medium text-base w-32 text-dp-text-primary fill-white
`;

// Index
export const MainContainer = tw.div`
  flex items-center justify-center min-h-screen
`;
export const MainWrapper = tw.div`
  flex w-full xl:max-w-4xl lg:max-w-2xl md:max-w-xl sm:max-w-lg max-w-[200px] p-4 border rounded-lg shadow sm:p-6 md:p-8 bg-dp-primary border-dp-hint/10 items-center justify-center
`;
export const StatusText = tw.p`
  text-xl text-center
`;
export const IndexContainer = tw.div`
  flex items-start justify-between min-h-screen
`;

// Script Toggle
export const ToggleWrapper = tw.div`
  px-10
`;
export const ToggleLabel = tw.label`
  relative inline-flex items-center justify-center w-full h-full cursor-pointer
`;
export const ToggleButton = tw.div`
  w-11 h-6 bg-gray-400 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-dp-hint rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600
`;

// DropDownInput
export const Select = tw.select`
  form-select bg-dp-secondary border-dp-hint/0 border text-sm rounded-lg block w-full p-2.5 placeholder-dp-placeholder-text text-dp-text-primary focus:border-blue-600 font-medium
`;

// RadioInput
export const RadioInputWrapper = tw.div`
  flex flex-col border-dp-hint/5 rounded-xl p-4 border shadow-xl gap-2 bg-dp-primary
`;
export const RadioContainer = tw.div`
  flex items-start rounded-full gap-3
`;
export const RadioButton = tw.input`
  form-radio cursor-pointer rounded-full w-4 h-4 bg-neutral-500 border-dp-hint/5 checked:bg-purple-600 checked:fill-red-500 focus:border-blue-600 focus:ring-offset-dp-secondary disabled:bg-neutral-300 disabled:border-dp-hint/20 peer disabled:cursor-not-allowed
`;
export const RadioLabel = tw.label`
  cursor-pointer rounded-full ml-2 text-sm font-medium peer-disabled:text-gray-500 peer-disabled:cursor-not-allowed
`;

// TextInput
export const TextField = tw.input`
  form-input focus:border-blue-600 border text-sm rounded-lg block w-full p-2.5 bg-dp-secondary border-dp-hint/0 placeholder-dp-placeholder-text text-dp-text-primary placeholder:font-normal font-medium
`;

// TextArea
export const TextArea = tw.textarea`
  form-textarea focus:border-blue-600 block p-2.5 w-full text-sm rounded-lg border bg-dp-secondary border-dp-hint/0 placeholder-dp-placeholder-text text-dp-text-primary placeholder:font-normal font-medium
`;

// GroupButton
export const GroupButtonContainer = tw.div`
  flex items-center justify-center font-semibold
`;
export const GroupButtonButton = tw.button`
  w-1/2 hover:bg-green-600/90 active:bg-dp-hint/100 border-dp-hint/5 text-dp-text-primary py-2 px-4 transition-all sm:text-xs
`;

// DateInput
export const DateInputLabelContainer = tw.div`
  inline-flex justify-between w-full
`;
export const DateInputLabel = tw.label`
  inline-flex items-center mb-2 text-sm font-semibold text-dp-text-primary
`;
export const AgeContainer = tw.p`
  text-sm text-dp-text-primary font-bold
`;

// Motion variants
export const scriptBoxVariants = {
  initial: {
    height: 0,
    opacity: 0,
  },
  visible: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: {
        duration: 0.4,
      },
      opacity: {
        duration: 0.25,
        delay: 0.15,
      },
    },
  },
  hidden: {
    opacity: 0,
    height: 0,
    transition: {
      height: {
        duration: 0.2,
      },
      opacity: {
        duration: 0.05,
      },
    },
  },
};

// SelectCreatable config style
export const creatableStyles: StylesConfig<OptionTypes> = {
  control: (provided, state) => ({
    ...provided,
    background: '#c7c7c7',
    borderRadius: '0.5rem',
    fontWeight: '500',
    color: '#000000',
    fontSize: '0.875rem',
    margin: '0px',
    '&:hover': {
      borderColor: '',
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    fontWeight: '500',
    color: '#595959',
  }),
  singleValue: (provided) => ({
    ...provided,
    fontWeight: '500',
    color: '#000000',
  }),
  menu: (provided) => ({
    ...provided,
    fontWeight: '500',
    color: '#000000',
    fontSize: '0.875rem',
    background: '#c7c7c7',
    borderRadius: '0.5rem',
    margin: '0px',
    padding: '0px',
  }),
  option: (provided, state) => ({
    ...provided,
    fontWeight: '500',
    color: state.isSelected ? 'rgb(150, 150, 150)' : '#000000',
    backgroundColor: state.isFocused ? 'rgb(126, 126, 126)' : '',
  }),
  input: (provided) => ({
    ...provided,
    fontWeight: '500',
    color: '#000000',
  }),
};
