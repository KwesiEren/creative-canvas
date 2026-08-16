import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { EVENTS_DATA } from '@/data/mockData.generated';
import { findByTitleSlug, slugify } from '@/lib/slug';
import { Breadcrumbs, MetaRow, Prose, ShareRow, EmptyState } from '@/components/adf/ui-extra';
import { btnPrimary, PageHero, SectionHeading } from '@/components/adf/ui';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const registrationSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  organization: z.string().optional(),
  country: z.string().min(1, 'Country is required'),
  attendanceMode: z.enum(['In-person', 'Virtual', 'Hybrid'], {
    required_error: 'Please select an attendance mode',
  }),
  accessibilityNeeds: z.string().optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to the terms to continue' }),
  }),
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

interface Props {
  slug: string;
}

export const EventDetailScreen: React.FC<Props> = ({ slug }) => {
  const item = findByTitleSlug(EVENTS_DATA, slug);
  const [submittedData, setSubmittedData] = useState<RegistrationFormValues | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      attendanceMode: 'Virtual' as const,
    },
  });

  const attendanceMode = watch('attendanceMode');

  if (!item) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-20">
        <EmptyState message="Event not found. The event you are looking for may have been cancelled or is no longer available." />
        <div className="mt-8 text-center">
          <Link
            to="/events"
            className="inline-flex items-center justify-center gap-2 border-2 border-[#0f1b3d] text-[#0f1b3d] font-bold uppercase tracking-widest text-sm px-8 py-4 hover:bg-[#0f1b3d] hover:text-white transition-colors"
          >
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const paragraphs = item.description.split('. ').map((p, i, arr) =>
    i === arr.length - 1 ? p : p + '.'
  );

  const metaItems = [
    { label: 'Date', value: item.date },
    { label: 'Time', value: item.time },
    { label: 'Location', value: item.location },
    { label: 'Country', value: item.country },
    { label: 'Type', value: item.type },
    { label: 'Audience', value: item.targetAudience },
    { label: 'Virtual', value: item.isVirtual ? 'Hybrid / Online available' : 'In-person only' },
    { label: 'Status', value: item.status },
  ];

  const onSubmit = (data: RegistrationFormValues) => {
    setSubmittedData(data);
  };

  const fieldError = (key: keyof RegistrationFormValues) =>
    errors[key]?.message;

  const inputBase =
    'h-auto px-4 py-3 rounded-none border-2 border-[#0f1b3d]/30 bg-white text-[#0f1b3d] focus-visible:ring-1 focus-visible:ring-[#245a86] focus-visible:border-[#245a86] text-base font-medium';
  const labelBase =
    'text-[11px] font-bold uppercase tracking-widest text-[#245a86] mb-2 block';

  return (
    <div>
      <Breadcrumbs
        trail={[
          { label: 'Home', to: '/' },
          { label: 'Events', to: '/events' },
          { label: item.title },
        ]}
      />

      <PageHero
        eyebrow={`${item.type} — ${item.status}`}
        title={item.title}
        intro={paragraphs[0] ?? ''}
        image="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=60"
        imageAlt={`${item.type} conference event`}
      />

      <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-12 space-y-12">
        <MetaRow items={metaItems} />

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <SectionHeading eyebrow="About this event" title="Overview" />
              <Prose paragraphs={paragraphs} />
            </section>

            <section>
              <SectionHeading eyebrow="Join us" title="Event Registration" />

              {submittedData ? (
                <div
                  className="border-4 border-[#245a86] p-8 md:p-10 space-y-4"
                  style={{ backgroundColor: '#e8edf3' }}
                  role="status"
                  aria-live="polite"
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-full bg-[#245a86] text-white grid place-items-center">
                      <span className="material-symbols-outlined text-2xl">check_circle</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold uppercase text-[#0f1b3d]">
                        Registration Received
                      </h3>
                      <p className="mt-3 text-[#33415c] leading-relaxed">
                        Thank you, <strong>{submittedData.fullName}</strong>. We have received your
                        registration for <em>{item.title}</em>.
                      </p>
                      <p className="mt-3 text-[#33415c] leading-relaxed">
                        We'll email a confirmation to{' '}
                        <a
                          href={`mailto:${submittedData.email}`}
                          className="font-bold text-[#245a86] underline underline-offset-4"
                        >
                          {submittedData.email}
                        </a>{' '}
                        within 24 hours with full joining instructions, agenda, and accessibility
                        support information for your selected attendance mode of{' '}
                        <strong>{submittedData.attendanceMode}</strong>.
                      </p>
                      {submittedData.accessibilityNeeds && (
                        <p className="mt-3 text-sm text-[#33415c] leading-relaxed border-t border-[#0f1b3d]/15 pt-4">
                          <span className="font-bold uppercase tracking-widest text-xs text-[#245a86] block mb-2">
                            Noted Accessibility Needs
                          </span>
                          {submittedData.accessibilityNeeds}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-[#0f1b3d]/15">
                    <button
                      type="button"
                      onClick={() => setSubmittedData(null)}
                      className="border-2 border-[#0f1b3d]/30 text-[#0f1b3d] font-bold uppercase tracking-widest text-sm px-6 py-3 hover:bg-[#0f1b3d] hover:text-white transition-colors"
                    >
                      Register another attendee
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="border-2 border-[#0f1b3d]/20 p-6 md:p-10 space-y-8 bg-white"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="fullName" className={labelBase}>
                        Full Name <span className="text-[#c0392b]">*</span>
                      </Label>
                      <Input
                        id="fullName"
                        type="text"
                        autoComplete="name"
                        className={inputBase}
                        {...register('fullName')}
                      />
                      {fieldError('fullName') && (
                        <p className="mt-2 text-xs font-bold text-[#c0392b] uppercase tracking-wider">
                          {fieldError('fullName')}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email" className={labelBase}>
                        Email <span className="text-[#c0392b]">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        className={inputBase}
                        {...register('email')}
                      />
                      {fieldError('email') && (
                        <p className="mt-2 text-xs font-bold text-[#c0392b] uppercase tracking-wider">
                          {fieldError('email')}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="organization" className={labelBase}>
                        Organization
                      </Label>
                      <Input
                        id="organization"
                        type="text"
                        autoComplete="organization"
                        className={inputBase}
                        {...register('organization')}
                      />
                    </div>

                    <div>
                      <Label htmlFor="country" className={labelBase}>
                        Country <span className="text-[#c0392b]">*</span>
                      </Label>
                      <Input
                        id="country"
                        type="text"
                        autoComplete="country-name"
                        className={inputBase}
                        {...register('country')}
                      />
                      {fieldError('country') && (
                        <p className="mt-2 text-xs font-bold text-[#c0392b] uppercase tracking-wider">
                          {fieldError('country')}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <span className={labelBase}>
                      Attendance Mode <span className="text-[#c0392b]">*</span>
                    </span>
                    <RadioGroup
                      value={attendanceMode}
                      onValueChange={(val) =>
                        setValue(
                          'attendanceMode',
                          val as 'In-person' | 'Virtual' | 'Hybrid',
                          { shouldValidate: true },
                        )
                      }
                      className="grid sm:grid-cols-3 gap-4 mt-2"
                    >
                      {(['In-person', 'Virtual', 'Hybrid'] as const).map((mode) => (
                        <div key={mode}>
                          <label
                            className={`flex items-start gap-3 border-2 p-5 cursor-pointer transition-colors ${
                              attendanceMode === mode
                                ? 'border-[#245a86] bg-[#e8edf3]'
                                : 'border-[#0f1b3d]/20 hover:border-[#0f1b3d]/40'
                            }`}
                          >
                            <RadioGroupItem value={mode} id={`mode-${mode}`} className="mt-0.5" />
                            <div>
                              <span className="block text-sm font-bold uppercase tracking-widest text-[#0f1b3d]">
                                {mode}
                              </span>
                              <span className="block mt-1 text-xs text-[#33415c]">
                                {mode === 'In-person' && 'Join us on site at the event venue'}
                                {mode === 'Virtual' && 'Attend via live streaming platform'}
                                {mode === 'Hybrid' && 'Best of both — switch any time'}
                              </span>
                            </div>
                          </label>
                        </div>
                      ))}
                    </RadioGroup>
                    {fieldError('attendanceMode') && (
                      <p className="mt-2 text-xs font-bold text-[#c0392b] uppercase tracking-wider">
                        {fieldError('attendanceMode')}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="accessibilityNeeds" className={labelBase}>
                      Accessibility Needs
                    </Label>
                    <Textarea
                      id="accessibilityNeeds"
                      rows={4}
                      placeholder="e.g. Sign language interpretation, wheelchair seating, large-print handouts, audio description, dietary requirements..."
                      className={`${inputBase} resize-y min-h-[100px]`}
                      {...register('accessibilityNeeds')}
                    />
                    <p className="mt-2 text-xs text-[#33415c]">
                      Optional — let us know about any accommodations that would help you
                      participate fully. We will confirm all arrangements via email.
                    </p>
                  </div>

                  <div className="border-t border-[#0f1b3d]/15 pt-6">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="consent"
                        checked={watch('consent') === true}
                        onCheckedChange={(checked) =>
                          setValue('consent', checked as true, { shouldValidate: true })
                        }
                      />
                      <div>
                        <label
                          htmlFor="consent"
                          className="text-sm text-[#0f1b3d] leading-relaxed cursor-pointer"
                        >
                          <span className="font-bold">
                            I agree to the terms and privacy policy <span className="text-[#c0392b]">*</span>
                          </span>
                          <span className="block mt-1 text-[#33415c]">
                            I consent to the African Disability Forum processing my personal data for
                            the purpose of event registration, attendance confirmation, and related
                            accessibility arrangements, in accordance with the ADF Privacy Notice.
                          </span>
                        </label>
                      </div>
                    </div>
                    {fieldError('consent') && (
                      <p className="mt-2 ml-7 text-xs font-bold text-[#c0392b] uppercase tracking-wider">
                        {fieldError('consent')}
                      </p>
                    )}
                  </div>

                  <div className="pt-2">
                    <button type="submit" className={btnPrimary}>
                      <span className="material-symbols-outlined text-base">how_to_reg</span>
                      Submit Registration
                    </button>
                  </div>
                </form>
              )}
            </section>
          </div>

          <aside className="space-y-8">
            <div className="bg-[#0f1b3d] text-white p-6 md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#a8c6e4]">
                Event Host
              </p>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-[#a8c6e4] shrink-0">
                    calendar_today
                  </span>
                  <span className="text-[#dbe6f2]">{item.date}</span>
                </div>
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-[#a8c6e4] shrink-0">
                    schedule
                  </span>
                  <span className="text-[#dbe6f2]">{item.time}</span>
                </div>
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-[#a8c6e4] shrink-0">
                    location_on
                  </span>
                  <span className="text-[#dbe6f2]">
                    {item.location}
                    <br />
                    {item.country}
                  </span>
                </div>
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-[#a8c6e4] shrink-0">group</span>
                  <span className="text-[#dbe6f2]">{item.targetAudience}</span>
                </div>
              </div>
              {item.isVirtual && (
                <div className="mt-6 pt-6 border-t border-white/20">
                  <div className="flex gap-2 items-center text-xs font-bold uppercase tracking-widest text-[#a8c6e4]">
                    <span className="material-symbols-outlined text-base">wifi</span>
                    Virtual attendance available
                  </div>
                  <p className="mt-2 text-sm text-[#dbe6f2] leading-relaxed">
                    Login links and dial-in numbers are sent 48 hours before the event to all
                    registered attendees.
                  </p>
                </div>
              )}
            </div>

            <div className="border-2 border-[#0f1b3d]/20 p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-[#245a86] mb-4">
                Questions?
              </p>
              <p className="text-sm text-[#33415c] leading-relaxed">
                Contact the ADF Events Team for group registrations, speaker invitations, or
                sponsorship opportunities.
              </p>
              <a
                href="mailto:events@adf-secretariat.org"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#245a86] underline underline-offset-4"
              >
                <span className="material-symbols-outlined text-base">mail</span>
                events@adf-secretariat.org
              </a>
            </div>

            <ShareRow title={item.title} path={`/events/${slugify(item.title)}`} />
          </aside>
        </div>
      </div>
    </div>
  );
};
