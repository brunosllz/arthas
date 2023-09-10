'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useController, useFormContext } from 'react-hook-form'
import { CreateNewProjectSchema } from './new-project-form'
import { InputMessageError } from '@/components/ui/input'

export const WEEK_DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const

export const HOURS = [
  '06:00',
  '06:30',
  '07:00',
  '07:30',
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
  '21:30',
  '22:00',
  '22:30',
  '23:00',
] as const

export const MEETING_TYPES = ['daily', 'weekly', 'monthly'] as const

export function MeetingSelectInput() {
  const { control } = useFormContext<CreateNewProjectSchema>()

  const {
    formState: { errors },
    field: { value: meetingTypeValue, onChange: setMeetingType },
  } = useController({
    control,
    name: 'meetingType',
  })

  const {
    field: { value: meetingHourValue, onChange: setMeetingHour },
  } = useController({
    control,
    name: 'meetingHour',
  })

  const {
    field: { value: meetingMonthDayValue, onChange: setMeetingMonthDay },
  } = useController({
    control,
    name: 'meetingMonthDay',
  })

  const {
    field: { value: meetingWeekDayValue, onChange: setMeetingWeekDay },
  } = useController({
    control,
    name: 'meetingWeekDay',
  })

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full space-y-1">
        <Select value={meetingTypeValue} onValueChange={setMeetingType}>
          <SelectTrigger>
            <SelectValue
              placeholder="Select period amount"
              className="placeholder:text-muted-foreground"
            />
          </SelectTrigger>
          <SelectContent>
            {MEETING_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {errors.meetingType && (
          <InputMessageError>{errors.meetingType.message}</InputMessageError>
        )}
      </div>

      <div className="grid w-full grid-cols-2 gap-4">
        {meetingTypeValue !== 'daily' &&
          (meetingTypeValue === 'weekly' ? (
            <div className="space-y-1">
              <Select
                disabled={!meetingTypeValue}
                value={meetingWeekDayValue}
                onValueChange={setMeetingWeekDay}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder="Select week day identify"
                    className="placeholder:text-muted-foreground"
                  />
                </SelectTrigger>

                <SelectContent>
                  {WEEK_DAYS.map((day) => (
                    <SelectItem key={day} value={day}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {errors.meetingWeekDay && (
                <InputMessageError>
                  {errors.meetingWeekDay.message}
                </InputMessageError>
              )}
            </div>
          ) : (
            <div className="space-y-1">
              <Select
                disabled={!meetingTypeValue}
                value={meetingMonthDayValue}
                onValueChange={setMeetingMonthDay}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder="Select month day identify"
                    className="placeholder:text-muted-foreground"
                  />
                </SelectTrigger>

                <SelectContent>
                  {
                    <ScrollArea className="h-72">
                      {Array.from({ length: 31 }, (_, i) => i + 1).map(
                        (day) => (
                          <SelectItem key={day} value={day.toString()}>
                            {day}
                          </SelectItem>
                        ),
                      )}
                    </ScrollArea>
                  }
                </SelectContent>
              </Select>

              {errors.meetingMonthDay && (
                <InputMessageError>
                  {errors.meetingMonthDay.message}
                </InputMessageError>
              )}
            </div>
          ))}

        <div className="space-y-1">
          <Select
            disabled={!meetingTypeValue}
            value={meetingHourValue}
            onValueChange={setMeetingHour}
          >
            <SelectTrigger>
              <SelectValue
                placeholder="Select period identifier"
                className="placeholder:text-muted-foreground"
              />
            </SelectTrigger>

            <SelectContent>
              <ScrollArea className="h-72">
                {HOURS.map((hour) => (
                  <SelectItem key={hour} value={hour}>
                    {hour}
                  </SelectItem>
                ))}
              </ScrollArea>
            </SelectContent>
          </Select>
          {errors.meetingHour && (
            <InputMessageError>{errors.meetingHour.message}</InputMessageError>
          )}
        </div>
      </div>
    </div>
  )
}
