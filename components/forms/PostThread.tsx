'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useOrganization } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter } from 'next/navigation';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import { ThreadValidation } from '@/lib/validations/thread';
import { createThread } from '@/lib/actions/thread.actions';
import ImageUpload from './uploadImage';
import { useState } from 'react';
import MediaUpload from './uploadMedia';

interface Props {
  userId: string;
}

function PostThread({ userId }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLOading] = useState(false);

  const { organization } = useOrganization();

  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: '',
      MediaUrl: '',

      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    const isVideo = values.MediaUrl?.endsWith('.mp4');

    await createThread({
      text: values.thread,
      imageUrl: isVideo ? '' : values.MediaUrl,
      videoUrl: isVideo ? values.MediaUrl : '',
      author: userId,
      communityId: organization ? organization.id : null,
      path: pathname,
    });

    router.push('/');
  };

  return (
    <Form {...form}>
      <form
        className="mt-10 flex flex-col justify-start gap-6.5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-gray-400">
                Content
              </FormLabel>
              <FormControl className="no-focus border border-light-1 bg-light-2 text-dark-1">
                <Textarea rows={10} {...field} placeholder="Write Something" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex items-center justify-center'>
          <FormField
            control={form.control}
            name="MediaUrl"
            render={({ field }) => (
              <FormItem className="flex   flex-col gap-3 py-1 my-1">
                <FormControl>
                  <MediaUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange('')}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="bg-primary-500"
          disabled={!form.formState.isDirty}
        >
          Post Thread
        </Button>
      </form>
    </Form>
  );
}

export default PostThread;
