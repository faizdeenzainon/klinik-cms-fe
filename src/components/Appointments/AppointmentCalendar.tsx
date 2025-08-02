import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay } from 'date-fns';
import { mockAppointments, mockPatients, mockDoctors } from '../../data/mockData';

export const AppointmentCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getAppointmentsForDate = (date: Date) => {
    return mockAppointments.filter(appointment => 
      isSameDay(new Date(appointment.date), date)
    );
  };

  const getPatientName = (patientId: string) => {
    const patient = mockPatients.find(p => p.id === patientId);
    return patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown';
  };

  const getDoctorName = (doctorId: string) => {
    const doctor = mockDoctors.find(d => d.id === doctorId);
    return doctor ? `${doctor.firstName} ${doctor.lastName}` : 'Unknown';
  };

  const selectedDateAppointments = getAppointmentsForDate(selectedDate);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Appointment Calendar</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>New Appointment</span>
          </button>
        </div>
      </div>

      <div className="flex">
        <div className="flex-1 p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-medium text-gray-900">
              {format(currentDate, 'MMMM yyyy')}
            </h4>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map(day => {
              const appointments = getAppointmentsForDate(day);
              const isCurrentMonth = isSameMonth(day, currentDate);
              const isSelectedDay = isSameDay(day, selectedDate);
              const isTodayDay = isToday(day);

              return (
                <button
                  key={day.toISOString()}
                  onClick={() => setSelectedDate(day)}
                  className={`
                    p-2 min-h-[3rem] text-sm border border-gray-100 hover:bg-gray-50 transition-colors duration-200
                    ${!isCurrentMonth ? 'text-gray-300' : 'text-gray-900'}
                    ${isSelectedDay ? 'bg-blue-50 border-blue-200' : ''}
                    ${isTodayDay ? 'bg-blue-600 text-white' : ''}
                  `}
                >
                  <div className="font-medium">{format(day, 'd')}</div>
                  {appointments.length > 0 && (
                    <div className="mt-1">
                      <div className={`text-xs px-1 py-0.5 rounded ${isTodayDay ? 'bg-white text-blue-600' : 'bg-blue-100 text-blue-700'}`}>
                        {appointments.length} apt{appointments.length !== 1 ? 's' : ''}
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="w-80 border-l border-gray-200 p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">
            {format(selectedDate, 'EEEE, MMMM d')}
          </h4>
          
          <div className="space-y-3">
            {selectedDateAppointments.length === 0 ? (
              <p className="text-gray-500 text-sm">No appointments scheduled</p>
            ) : (
              selectedDateAppointments.map(appointment => (
                <div key={appointment.id} className="p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{appointment.time}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      appointment.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                      appointment.status === 'completed' ? 'bg-green-100 text-green-700' :
                      appointment.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-900 font-medium">{getPatientName(appointment.patientId)}</p>
                  <p className="text-sm text-gray-500">{getDoctorName(appointment.doctorId)}</p>
                  <p className="text-xs text-gray-500 mt-1 capitalize">{appointment.type}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};