'use client';

import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { toast } from 'sonner';

import { Button, Card, CardContent, Input } from '@client/ui';

import { LoadingScreen } from '@client/app/components';
import { useAuth } from '@client/app/contexts';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState<string>();
  const { login, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (isAuthenticated) {
    return toast.warning('Oops! Looks like you already logged in.', {
      closeButton: true,
      richColors: true,
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-amber-200">
      <Card className="w-full max-w-md p-6 rounded-2xl shadow-lg bg-white">
        <CardContent>
          {response ? (
            <p className="text-center text-red-100 font-semibold gap-2 italic bg-red-600 rounded-sm mt-2 mb-2 p-2">
              {response.replace('"', '')}
            </p>
          ) : (
            <></>
          )}
          <h2 className="text-2xl font-semibold text-center mb-6 text-amber-600">
            Welcome again!
          </h2>
          <form onSubmit={e => e.preventDefault()} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              className="dark:text-black"
              onChange={e => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              className="dark:text-black"
              onChange={e => setPassword(e.target.value)}
              required
            />
            <div className="text-right text-sm">
              <Link href="/" className="text-amber-500 hover:underline">
                Forgetten Password *_* ?
              </Link>
            </div>
            <Button
              onClick={handleLoginUser}
              type="submit"
              className="w-full text-white bg-amber-600 hover:bg-amber-700"
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );

  async function handleLoginUser() {
    if (email !== null || email !== '' && password !== null && password !== '') {
      const formData = {
        email: email.trim(),
        password: password,
      };
      const request = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_PROTOCOL}://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}/api/user/login`,
        formData
      ).catch(e => setResponse(e.response.data)) as AxiosResponse;
      console.log(request.status);

      if (!isAuthenticated) {
        if (request.status === 200) {
          login(request.data.token, JSON.stringify(request.data));
          window.location.href = '/';
        }
      }
    }
  }
}
