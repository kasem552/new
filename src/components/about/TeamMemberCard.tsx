import React from 'react';
import { Crown, Settings } from 'lucide-react';
import { TeamMember } from '../../types/team';

interface TeamMemberCardProps {
  member: TeamMember;
  isLeadership: boolean;
}

export function TeamMemberCard({ member, isLeadership }: TeamMemberCardProps) {
  return (
    <div 
      className={`
        group bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl 
        ${isLeadership ? 'p-8 transform hover:scale-105' : 'p-6 hover:scale-102'} 
        hover:border-accent/50 transition-all duration-500 
        hover:shadow-[0_0_30px_rgba(31,220,234,0.2)]
        ${isLeadership ? 'md:col-span-1' : 'col-span-1'}
      `}
    >
      <div className={`flex items-start ${isLeadership ? 'gap-8' : 'gap-6'}`}>
        {/* Profile Image */}
        <div className="relative flex-shrink-0">
          <div 
            className={`
              ${isLeadership ? 'w-40 h-40' : 'w-28 h-28'} 
              rounded-2xl overflow-hidden border-2 border-accent/20
              transform transition-transform duration-500
              group-hover:border-accent/50 group-hover:shadow-lg
            `}
          >
            <img 
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          {member.role === 'owner' && (
            <div className="absolute -right-2 -bottom-2">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors duration-300">
                <Crown className="w-5 h-5 text-accent" />
              </div>
            </div>
          )}
          {member.role === 'supervisor' && (
            <div className="absolute -right-2 -bottom-2">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors duration-300">
                <Settings className="w-5 h-5 text-accent" />
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4">
          <div>
            <h3 className={`
              ${isLeadership ? 'text-2xl' : 'text-xl'} 
              font-bold tracking-wider text-white 
              group-hover:text-accent transition-colors duration-300
            `}>
              {member.name}
            </h3>
            <p className="text-lg text-accent tracking-wide font-medium mt-1">{member.title}</p>
          </div>
          <p className={`
            ${isLeadership ? 'text-base leading-relaxed' : 'text-sm leading-relaxed'} 
            text-white/80 font-light
          `}>
            {member.quote}
          </p>
        </div>
      </div>
    </div>
  );
}