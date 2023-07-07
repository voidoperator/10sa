export type ConstantDataType = {
  google_app_url: string | undefined;
  agent_full_name: string | undefined;
  agent_license_number: string | undefined;
  agent_npn: string | undefined;
  agent_phone_number: string | undefined;
  agent_email: string | undefined;
  show_script: string | undefined;
};

export type ScriptToggleProps = {
  id: string;
  defaultOption: string;
};

export type LocalStorageInputProps = {
  id: string;
  name: string;
  labelName: string;
  placeholder: string;
  required?: boolean;
  uppercase?: boolean;
  useDefault?: boolean;
  defaultKey?: string;
  defaultValue?: string;
  externalValue?: string;
  phone?: boolean;
};

export type ScriptProps = {
  children: React.ReactNode;
  important?: boolean;
};
