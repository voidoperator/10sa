import tw from 'tailwind-styled-components';

// Globals
export const MainLabel = tw.label`
  block mb-2 text-sm font-medium text-white
`;
export const MainLabelSpan = tw.span`
  block mb-2 text-sm font-medium text-white cursor-default
`;
export const SubLabel = tw.label`
  focus:ring-10sa-gold focus:border-10sa-gold border text-sm rounded-lg block w-full p-2.5 bg-10sa-deep-purple border-10sa-gold/40 placeholder-gray-400
`;
export const SubLabelSpan = tw.span`
  focus:ring-10sa-gold focus:border-10sa-gold border text-sm rounded-lg block w-full p-2.5 bg-10sa-deep-purple border-10sa-gold/40 placeholder-gray-400
`;
export const RequiredSpan = tw.span`
  ml-1 after:content-["*"] after:text-yellow-300/90
`;
export const ShadowDiv = tw.div`
  flex flex-col shadow-xl border-10sa-gold/25 rounded-xl p-4 border gap-2
`;
export const Divider = tw.div`
  h-[1px] w-full bg-10sa-gold/75 my-0 sm:my-10 hidden sm:block
`;
export const ScriptBox = tw.p`
  rounded-[50px] p-8 bg-purple-900 shadow-xl
`;
export const AgentInfoBox = tw.div`
  flex flex-col shadow-xl border-10sa-gold/25 rounded-xl px-4 py-6 border gap-6 mt-6
`;

// Form
export const FormSectionContainer = tw.section`
  4xl:max-w-4xl 3xl:max-w-3xl xl:max-w-xl lg:max-w-lg w-full p-4 bg-10sa-purple border border-10sa-gold/25 rounded-lg shadow sm:p-6 md:p-8 my-20
`;
export const HeadingSrOnly = tw.h1`
  cursor-default text-2xl font-medium text-white text-center sr-only
`;
export const FormForm = tw.form`
  space-y-6
`;
export const LogoContainer = tw.div`
  flex items-center justify-center
`;
export const ButtonContainer = tw.div`
  w-full inline-flex gap-4
`;
export const Button = tw.button`
  hover:bg-10sa-gold/60 bg-purple-800 border border-10sa-gold/25 active:bg-10sa-gold/100 w-full transition-all text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-blue-800
`;
export const H2 = tw.h2`
  cursor-default text-xl font-medium text-white
`;
export const AddDependentContainer = tw.div`
  flex items-center justify-center gap-6
`;
export const AddDependentButton = tw.button`
  bg-10sa-gold/60 hover:bg-10sa-gold mx-6 w-1/2 transition-all text-white disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:cursor-not-allowed shadow-xl focus:ring-4 focus:outline-none font-medium rounded-full text-sm py-2.5 text-center focus:ring-blue-800
`;
export const ExternalAnchorButton = tw.a`
  bg-10sa-gold/60 hover:bg-10sa-gold mx-6 w-1/2 transition-all text-white disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:cursor-not-allowed shadow-xl focus:ring-4 focus:outline-none font-medium rounded-full text-sm py-2.5 text-center focus:ring-blue-800
`;
export const RemoveDependentButton = tw.button`
  w-6 absolute top-2 right-2 opacity-70 hover:opacity-100 transition-all
`;
export const AdditionalInsuredContainer = tw.div`
  flex relative flex-col gap-4 px-6 py-5 border rounded-xl border-white/10 w-full h-full
`;
export const EligibilityIconContainer = tw.div`
  flex items-center justify-center text-white
`;

// Summary
export const SummarySection = tw.section`
  relative z-50 min-h-screen w-1/4
`;
export const SummaryContainer = tw.div`
  flex flex-col gap-4 fixed top-0 right-0 border-l bg-10sa-purple border-10sa-gold/30 h-full w-1/4 px-4 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-10sa-gold scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-track-10sa-deep-purple
`;
export const SummaryUl = tw.ul`
  flex flex-wrap gap-2 justify-center pt-3
`;
export const SummaryLi = tw.li`
  rounded-full px-3 font-medium text-base w-32 text-white fill-white
`;

// SideNav
export const Nav = tw.nav`
  relative w-[10svw] min-h-screen
`;
export const SymbolContainer = tw.div`
  flex flex-col gap-8 shadow-xl fixed top-8 left-8
`;
export const AutoSymbolContainer = tw.div`
  flex flex-col gap-8 shadow-xl fixed bottom-8 left-8
`;
export const Anchor = tw.a`
  group bg-10sa-gold transition-all rounded-full p-2 inline-flex items-center relative
`;
export const AnchorSpan = tw.span`
  text-white font-semibold absolute transition-all transform -translate-x-8 -translate-y-1/2 top-1/2 w-0 overflow-hidden whitespace-nowrap group-hover:translate-x-14 group-hover:w-auto group-hover:opacity-100 opacity-0
`;

// Index
export const MainContainer = tw.div`
  flex items-center justify-center min-h-screen py-20
`;
export const MainWrapper = tw.div`
  flex w-full max-w-4xl p-4 border rounded-lg shadow sm:p-6 md:p-8 bg-10sa-purple border-10sa-gold/40 items-center justify-center
`;
export const StatusText = tw.p`
  text-xl
`;
export const IndexContainer = tw.div`
  flex items-start justify-between min-h-screen
`;

// DropDownInput
export const Select = tw.select`
  form-select bg-10sa-deep-purple border-10sa-gold/40 border text-sm rounded-lg block w-full p-2.5 placeholder-gray-400 text-white focus:ring-10sa-gold focus:border-10sa-gold
`;

// RadioInput
export const RadioInputWrapper = tw.div`
  flex flex-col border-10sa-gold/25 rounded-xl p-4 border shadow-xl gap-2
`;
export const RadioContainer = tw.div`
  flex items-start rounded-full gap-3
`;
export const RadioButton = tw.input`
  form-radio cursor-pointer rounded-full w-4 h-4 bg-gray-600 border-10sa-gold/50 checked:bg-purple-600 checked:fill-red-500 focus:ring-10sa-gold focus:border-10sa-gold focus:ring-offset-10sa-deep-purple disabled:bg-gray-800 disabled:border-10sa-gold/20 peer disabled:cursor-not-allowed
`;
export const RadioLabel = tw.label`
  cursor-pointer rounded-full ml-2 text-sm font-medium peer-disabled:text-gray-500 peer-disabled:cursor-not-allowed
`;

// TextInput
export const TextField = tw.input`
  form-input focus:ring-10sa-gold focus:border-10sa-gold border text-sm rounded-lg block w-full p-2.5 bg-10sa-deep-purple border-10sa-gold/40 placeholder-gray-400 text-white
`;

// TextArea
export const TextArea = tw.textarea`
  form-textarea focus:ring-10sa-gold focus:border-10sa-gold block p-2.5 w-full text-sm rounded-lg border bg-10sa-deep-purple border-10sa-gold/40 placeholder-gray-400 text-white
`;

// GroupButton
export const GroupButtonContainer = tw.div`
  flex items-center justify-center
`;
export const GroupButtonButton = tw.button`
  w-full hover:bg-10sa-gold/90 active:bg-10sa-gold/100 border-10sa-gold/25 text-white py-2 px-4 transition-all
`;

// DateInput
export const DateInputLabelContainer = tw.div`
  inline-flex justify-between w-full
`;
export const DateInputLabel = tw.label`
  inline-flex items-center mb-2 text-sm font-medium text-white
`;
export const AgeContainer = tw.p`
  text-sm text-white font-bold
`;
