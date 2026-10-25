import React from 'react';
import { Tractor, Users, ShoppingBag, Truck, Warehouse, Sprout, LucideIcon } from 'lucide-react';
import { ServiceType } from '../types';

interface ServiceIconProps {
  type: ServiceType | 'Default';
  className?: string;
  size?: number;
}

export const ServiceIcon: React.FC<ServiceIconProps> = ({ type, className = 'w-6 h-6', size = 24 }) => {
  let IconComponent: LucideIcon = Sprout;

  switch (type) {
    case 'Agricultural Equipment':
      IconComponent = Tractor;
      break;
    case 'Agricultural Labour':
      IconComponent = Users;
      break;
    case 'Crop Buyers':
      IconComponent = ShoppingBag;
      break;
    case 'Crop Transportation':
      IconComponent = Truck;
      break;
    case 'Crop Storage':
      IconComponent = Warehouse;
      break;
    default:
      IconComponent = Sprout;
      break;
  }

  return <IconComponent size={size} className={className} />;
};
