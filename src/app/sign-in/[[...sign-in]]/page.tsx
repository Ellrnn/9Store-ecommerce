"use client";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import { useAuth } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function SignInPage() {
  // const { isSignedIn } = useAuth();

  // const searchParams = useSearchParams();
  // const redirectUrl = searchParams.get("redirect_url");
  // const router = useRouter();

  // useEffect(() => {
  //   console.log({
  //     isSignedIn,
  //     redirectUrl,
  //   });

  //   if (isSignedIn && redirectUrl) {
  //     console.log("caiu aq", redirectUrl.replace(window.origin, ""));

  //     router.replace(redirectUrl.replace(window.origin, ""));
  //   }
  // }, [isSignedIn, redirectUrl, router]);

  return (
    <div className="grid w-full grow items-center mt-40 px-4 sm:justify-center">
      <SignIn.Root path="/sign-in">
        <Clerk.Loading>
          {(isGlobalLoading) => (
            <>
              <SignIn.Step name="start">
                <Card className="w-full sm:w-96">
                  <CardHeader>
                    <CardTitle>LOGIN</CardTitle>
                    <CardDescription>
                      Bem vindo(a) de volta! <br />
                      Por favor, faça login para continuar.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-y-4">
                    <div className="grid grid-cols-2 gap-x-4">
                      <Clerk.Connection name="facebook" asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          type="button"
                          disabled={isGlobalLoading}
                        >
                          <Clerk.Loading scope="provider:facebook">
                            {(isLoading) =>
                              isLoading ? (
                                <Icons.spinner className="size-4 animate-spin" />
                              ) : (
                                <>
                                  <Icons.facebook className="mr-2 size-4" />
                                  Facebook
                                </>
                              )
                            }
                          </Clerk.Loading>
                        </Button>
                      </Clerk.Connection>
                      <Clerk.Connection name="google" asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          type="button"
                          disabled={isGlobalLoading}
                        >
                          <Clerk.Loading scope="provider:google">
                            {(isLoading) =>
                              isLoading ? (
                                <Icons.spinner className="size-4 animate-spin" />
                              ) : (
                                <>
                                  <Icons.google className="mr-2 size-4" />
                                  Google
                                </>
                              )
                            }
                          </Clerk.Loading>
                        </Button>
                      </Clerk.Connection>
                    </div>
                    <p className="flex items-center gap-x-3 text-sm text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
                      ou
                    </p>
                    <Clerk.Field name="identifier" className="space-y-2">
                      <Clerk.Label asChild>
                        <Label>E-mail </Label>
                      </Clerk.Label>
                      <Clerk.Input type="email" required asChild>
                        <Input />
                      </Clerk.Input>
                      <Clerk.FieldError className="block text-sm text-destructive" />
                    </Clerk.Field>
                  </CardContent>
                  <CardFooter>
                    <div className="grid w-full gap-y-4">
                      <SignIn.Action submit asChild>
                        <Button disabled={isGlobalLoading}>
                          <Clerk.Loading>
                            {(isLoading) => {
                              return isLoading ? (
                                <Icons.spinner className="size-4 animate-spin" />
                              ) : (
                                "Continue"
                              );
                            }}
                          </Clerk.Loading>
                        </Button>
                      </SignIn.Action>

                      <Button variant="link" size="sm" asChild>
                        <Clerk.Link navigate="sign-up">
                          Não tem conta ainda? Cadastre-se
                        </Clerk.Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </SignIn.Step>

              <SignIn.Step name="choose-strategy">
                <Card className="w-full sm:w-96">
                  <CardHeader>
                    <CardTitle>Usar outro método</CardTitle>
                    <CardDescription>
                      Enfrentando problemas? Você pode usar qualquer um desses
                      métodos para fazer login.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-y-4">
                    <SignIn.SupportedStrategy name="email_code" asChild>
                      <Button
                        type="button"
                        variant="link"
                        disabled={isGlobalLoading}
                      >
                        Código de E-mail
                      </Button>
                    </SignIn.SupportedStrategy>
                    <SignIn.SupportedStrategy name="password" asChild>
                      <Button
                        type="button"
                        variant="link"
                        disabled={isGlobalLoading}
                      >
                        Password
                      </Button>
                    </SignIn.SupportedStrategy>
                  </CardContent>
                  <CardFooter>
                    <div className="grid w-full gap-y-4">
                      <SignIn.Action navigate="previous" asChild>
                        <Button disabled={isGlobalLoading}>
                          <Clerk.Loading>
                            {(isLoading) => {
                              return isLoading ? (
                                <Icons.spinner className="size-4 animate-spin" />
                              ) : (
                                "Go back"
                              );
                            }}
                          </Clerk.Loading>
                        </Button>
                      </SignIn.Action>
                    </div>
                  </CardFooter>
                </Card>
              </SignIn.Step>

              <SignIn.Step name="verifications">
                <SignIn.Strategy name="password">
                  <Card className="w-full sm:w-96">
                    <CardHeader>
                      <CardTitle>Verifique seu E-mail</CardTitle>
                      <CardDescription>
                        Digite o código de verificação enviado para seu e-mail.
                      </CardDescription>
                      <p className="text-sm text-muted-foreground">
                        Bem-vindo(a) de volta! <SignIn.SafeIdentifier />
                      </p>
                    </CardHeader>
                    <CardContent className="grid gap-y-4">
                      <Clerk.Field name="password" className="space-y-2">
                        <Clerk.Label asChild>
                          <Label>Senha</Label>
                        </Clerk.Label>
                        <Clerk.Input type="password" asChild>
                          <Input />
                        </Clerk.Input>
                        <Clerk.FieldError className="block text-sm text-destructive" />
                      </Clerk.Field>
                    </CardContent>
                    <CardFooter>
                      <div className="grid w-full gap-y-4">
                        <SignIn.Action submit asChild>
                          <Button disabled={isGlobalLoading}>
                            <Clerk.Loading>
                              {(isLoading) => {
                                return isLoading ? (
                                  <Icons.spinner className="size-4 animate-spin" />
                                ) : (
                                  "Continue"
                                );
                              }}
                            </Clerk.Loading>
                          </Button>
                        </SignIn.Action>
                        <SignIn.Action navigate="choose-strategy" asChild>
                          <Button type="button" size="sm" variant="link">
                            Usar outro método
                          </Button>
                        </SignIn.Action>
                      </div>
                    </CardFooter>
                  </Card>
                </SignIn.Strategy>

                <SignIn.Strategy name="email_code">
                  <Card className="w-full sm:w-96">
                    <CardHeader>
                      <CardTitle>Verifique seu E-mail</CardTitle>
                      <CardDescription>
                        Digite o código de verificação enviado para seu e-mail.
                      </CardDescription>
                      <p className="text-sm text-muted-foreground">
                        Bem-vindo(a) de volta!
                        <SignIn.SafeIdentifier />
                      </p>
                    </CardHeader>
                    <CardContent className="grid gap-y-4">
                      <Clerk.Field name="code">
                        <Clerk.Label className="sr-only">
                          Código de verificação de e-mail
                        </Clerk.Label>
                        <div className="grid gap-y-2 items-center justify-center">
                          <div className="flex justify-center text-center">
                            <Clerk.Input
                              type="otp"
                              autoSubmit
                              className="flex justify-center has-[:disabled]:opacity-50"
                              render={({ value, status }) => {
                                return (
                                  <div
                                    data-status={status}
                                    className="relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md data-[status=selected]:ring-1 data-[status=selected]:ring-ring data-[status=cursor]:ring-1 data-[status=cursor]:ring-ring"
                                  >
                                    {value}
                                  </div>
                                );
                              }}
                            />
                          </div>
                          <Clerk.FieldError className="block text-sm text-destructive text-center" />
                          <SignIn.Action
                            asChild
                            resend
                            className="text-muted-foreground"
                            fallback={({ resendableAfter }) => (
                              <Button variant="link" size="sm" disabled>
                                Não recebeu um código? Reenviar (
                                <span className="tabular-nums">
                                  {resendableAfter}
                                </span>
                                )
                              </Button>
                            )}
                          >
                            <Button variant="link" size="sm">
                              Não recebeu um código? Reenviar
                            </Button>
                          </SignIn.Action>
                        </div>
                      </Clerk.Field>
                    </CardContent>
                    <CardFooter>
                      <div className="grid w-full gap-y-4">
                        <SignIn.Action submit asChild>
                          <Button disabled={isGlobalLoading}>
                            <Clerk.Loading>
                              {(isLoading) => {
                                return isLoading ? (
                                  <Icons.spinner className="size-4 animate-spin" />
                                ) : (
                                  "Continue"
                                );
                              }}
                            </Clerk.Loading>
                          </Button>
                        </SignIn.Action>
                        <SignIn.Action navigate="choose-strategy" asChild>
                          <Button size="sm" variant="link">
                            Usar outro método
                          </Button>
                        </SignIn.Action>
                      </div>
                    </CardFooter>
                  </Card>
                </SignIn.Strategy>
              </SignIn.Step>
            </>
          )}
        </Clerk.Loading>
      </SignIn.Root>
    </div>
  );
}
