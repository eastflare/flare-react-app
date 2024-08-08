import { useNavigate } from "react-router";
import { useTheme } from "@lges/design-system";
import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import { Login } from "@mui/icons-material";
import { Label } from "components/ui/label";
import { InputField } from "components/ui/input-field";
import { Button } from "components/ui/button";
import { HelperText } from "components/ui/helper-text";

import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "hooks/queries/login/use-login-mutation";
//import { useLoading } from 'components/loader';
import useLanguageStore from "stores/useLanguageStore";
import useSessionStore from "stores/useSessionStore";
import { LanguageCode } from "models/common/Session";
import useToast from "hooks/cmn/useToast";
//import { useMessageBar } from 'components/ui/message-bar';

const loginSchema = z.object({
  userId: z
    .string({
      required_error: "사용자ID를 반드시 입력하세요.", // non undefined
    })
    .min(1, "사용자ID를 반드시 입력하세요."), // non empty string
  langCd: z
    .nativeEnum(LanguageCode, {
      required_error: "언어를 반드시 선택하세요.",
    })
    .or(z.string().min(1, "언어를 반드시 선택하세요.")),
});
type LoginForm = z.infer<typeof loginSchema>;

const LoginRouter = () => {
  const [theme] = useTheme();
  const { setSession } = useSessionStore();
  const { changeLanguage } = useLanguageStore();
  const navigate = useNavigate();
  const { mutateAsync: loginAsync } = useLoginMutation();
  const { myToast } = useToast();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userId: "developer",
      langCd: "ko",
    },
  });

  const onSubmit = handleSubmit(async ({ userId, langCd }) => {
    try {
      //openLoading(true);

      const response = await loginAsync({ userId, langCd });

      if (response.successOrNot !== "Y" || !response?.data) {
        throw new Error("로그인에 실패하였습니다.");
      }

      const session = response.data;

      changeLanguage(session.langCd || "ko");
      setSession(session);

      navigate("/", { replace: true });
    } catch (e) {
      console.log({ e });
      myToast("error", "로그인에 실패하였습니다.");
      // openMessageBar({
      //   content: '로그인에 실패하였습니다.',
      //   messageBarType: 'error',
      // });
    } finally {
      //openLoading(false);
    }
  });

  return (
    <Box display='flex' width='100%' height='100%' justifyContent='center' pt='160px' bgcolor={theme.palette.semantic.color.commonBgDeeper}>
      <Box>
        <Typography variant='h2' textAlign='center' fontSize='24px' lineHeight='150%'>
          표준프레임워크 로그인
        </Typography>
        <form onSubmit={onSubmit}>
          <Box mt='10px' px='24px' py='16px' minWidth='364px' bgcolor={theme.palette.semantic.color.commonBgBasic} boxShadow='0px 7px 10px 0px rgba(0, 0, 0, 0.12), 0px 0px 2px 0px rgba(0, 0, 0, 0.22)' display='flex' flexDirection='column'>
            <Box display='flex' alignItems='center'>
              <Label htmlFor='userId' labelText='사용자ID' textAlign='left' minWidth='80px' isRequired />
              <Box ml='8px' flex='1'>
                <Controller control={control} name='userId' render={({ field: { ref, ...field } }) => <InputField {...field} inputRef={ref} id='userId' size='small' fullWidth placeholder='사용자ID를 입력하세요.' />} />
                <Box mt='4px'>
                  <HelperText infoText={errors?.userId?.message ?? ""} usecase='error' />
                </Box>
              </Box>
            </Box>
            <Box mt='4px' display='flex' alignItems='center'>
              <Label htmlFor='language-select' labelText='언어설정' textAlign='left' minWidth='80px' isRequired />
              <Box ml='8px' flex='1'>
                <FormControl fullWidth>
                  <Controller
                    control={control}
                    name='langCd'
                    render={({ field }) => (
                      // TODO: change to @lges/design-system component
                      <Select {...field} id='language-select' label='' size='small' displayEmpty fullWidth renderValue={renderValue => (renderValue ? renderValue : "언어를 선택하세요.")}>
                        {Object.entries(LanguageCode).map(([languageCode, languageValue]) => (
                          <MenuItem key={languageCode} value={languageCode}>
                            {languageValue}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  <Box mt='4px'>
                    <HelperText infoText={errors?.langCd?.message ?? ""} usecase='error' />
                  </Box>
                </FormControl>
              </Box>
            </Box>
            <Box display='flex' alignItems='center' justifyContent='flex-end' mt='12px'>
              <Button type='submit' size='small' appearance='contained' priority='primary' iconPosition='leading' iconComponent={<Login />}>
                로그인
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default LoginRouter;
