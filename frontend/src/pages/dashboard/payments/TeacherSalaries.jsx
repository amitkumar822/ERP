import { useState } from 'react';
import { useForm } from 'react-hook-form';
import jsPDF from 'jspdf';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

export default function TeacherSalaries() {
  const [darkMode, setDarkMode] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [formData, setFormData] = useState(null);

  const downloadPDF = () => {
    if (!formData) return;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Salary Receipt', 20, 20);

    doc.setFontSize(12);
    let yPosition = 40;

    Object.entries(formData).forEach(([key, value]) => {
      doc.text(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`, 20, yPosition);
      yPosition += 10;
    });

    doc.save('salary-receipt.pdf');
  };

  const onSubmit = (data) => {
    setFormData(data);
    downloadPDF();
  };

  return (
    <div className={`min-h-screen p-8 dark:bg-gray-900 dark:text-white`}>
      <div className="max-w-4xl mx-auto">
       
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Teacher Name */}
            <div className="space-y-2">
              <Label htmlFor="teacherName" className="font-medium">
                Teacher Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="teacherName"
                {...register('teacherName', { required: 'Teacher name is required' })}
                className={`${errors.teacherName ? 'border-red-500' : ''}`}
              />
              {errors.teacherName && (
                <p className="text-red-500 text-sm">{errors.teacherName.message}</p>
              )}
            </div>

            {/* Salary Amount */}
            <div className="space-y-2">
              <Label htmlFor="salaryAmount" className="font-medium">
                Salary Amount (₹) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="salaryAmount"
                type="number"
                {...register('salaryAmount', {
                  required: 'Salary amount is required',
                  min: { value: 0, message: 'Amount must be positive' }
                })}
                className={`${errors.salaryAmount ? 'border-red-500' : ''}`}
              />
              {errors.salaryAmount && (
                <p className="text-red-500 text-sm">{errors.salaryAmount.message}</p>
              )}
            </div>

            {/* Payment Mode */}
            <div className="space-y-2">
              <Label className="font-medium">
                Payment Mode <span className="text-red-500">*</span>
              </Label>
              <Select {...register('paymentMode', { required: 'Payment mode is required' })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
              {errors.paymentMode && (
                <p className="text-red-500 text-sm">{errors.paymentMode.message}</p>
              )}
            </div>

            {/* Salary Date */}
            <div className="space-y-2">
              <Label htmlFor="salaryDate" className="font-medium">
                Salary Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="salaryDate"
                type="date"
                {...register('salaryDate', { required: 'Salary date is required' })}
                className={`${errors.salaryDate ? 'border-red-500' : ''}`}
              />
              {errors.salaryDate && (
                <p className="text-red-500 text-sm">{errors.salaryDate.message}</p>
              )}
            </div>

            {/* Bonus */}
            <div className="space-y-2">
              <Label htmlFor="bonus" className="font-medium">
                Bonus (₹)
              </Label>
              <Input
                id="bonus"
                type="number"
                {...register('bonus', { min: 0 })}
              />
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label className="font-medium">
                Status <span className="text-red-500">*</span>
              </Label>
              <Select {...register('status', { required: 'Status is required' })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              {errors.status && (
                <p className="text-red-500 text-sm">{errors.status.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              Generate PDF and Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}