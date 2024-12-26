import React from 'react';
import { TeamMemberCard } from './TeamMemberCard';
import { TeamMember } from '../../types/team';

interface TeamGridProps {
  leadershipMembers: TeamMember[];
  orderedTeamMembers: TeamMember[];
}

export function TeamGrid({ leadershipMembers, orderedTeamMembers }: TeamGridProps) {
  if (!leadershipMembers?.length || !orderedTeamMembers?.length) {
    return (
      <div className="text-center text-white/70 py-8">
        Loading team members...
      </div>
    );
  }

  // Separate Sara and Yassine from other team members
  const centerMembers = orderedTeamMembers.filter(member => 
    member.name === "Sara" || member.name === "Yassine"
  );
  const otherMembers = orderedTeamMembers.filter(member => 
    member.name !== "Sara" && member.name !== "Yassine"
  );

  return (
    <>
      {/* Leadership Grid - Larger Gap */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        {leadershipMembers.map((member) => (
          <TeamMemberCard key={member.name} member={member} isLeadership={true} />
        ))}
      </div>

      {/* Team Grid with Centered Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {/* First row of other members */}
        {otherMembers.slice(0, 3).map((member) => (
          <div key={member.name} className="flex justify-center">
            <TeamMemberCard member={member} isLeadership={false} />
          </div>
        ))}

        {/* Center row with Sara and Yassine */}
        <div className="lg:col-span-3 flex justify-center gap-8">
          {centerMembers.map((member) => (
            <div key={member.name} className="flex-1 max-w-md">
              <TeamMemberCard member={member} isLeadership={false} />
            </div>
          ))}
        </div>

        {/* Remaining team members */}
        {otherMembers.slice(3).map((member) => (
          <div key={member.name} className="flex justify-center">
            <TeamMemberCard member={member} isLeadership={false} />
          </div>
        ))}
      </div>
    </>
  );
}