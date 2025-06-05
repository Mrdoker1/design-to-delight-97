import React from 'react';
import { Voice } from '../../types/voice';

interface VoiceTableProps {
  voices: Voice[];
  onEdit: (voice: Voice) => void;
  onDelete: (voice: Voice) => void;
}

export const VoiceTable: React.FC<VoiceTableProps> = ({ voices, onEdit, onDelete }) => {
  const getFlagIcon = (languageCode: string) => {
    const flagIcons: Record<string, string> = {
      EN: "<svg width=\"21\" height=\"20\" viewBox=\"0 0 21 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"flag-icon\" style=\"width: 20px; height: 20px\"> <g clip-path=\"url(#clip0_12930_18349)\"> <path d=\"M10.7998 20C16.3227 20 20.7998 15.5228 20.7998 10C20.7998 4.47715 16.3227 0 10.7998 0C5.27696 0 0.799805 4.47715 0.799805 10C0.799805 15.5228 5.27696 20 10.7998 20Z\" fill=\"white\"></path> <path d=\"M2.86723 3.91211C2.08172 4.9341 1.48941 6.11203 1.14453 7.39168H6.3468L2.86723 3.91211Z\" fill=\"#154CCF\"></path> <path d=\"M20.4551 7.39164C20.1102 6.11203 19.5179 4.9341 18.7324 3.91211L15.2529 7.39164H20.4551Z\" fill=\"#154CCF\"></path> <path d=\"M1.14453 12.6094C1.48945 13.889 2.08176 15.0669 2.86723 16.0889L6.34668 12.6094H1.14453Z\" fill=\"#154CCF\"></path> <path d=\"M16.8882 2.06648C15.8662 1.28098 14.6883 0.688672 13.4087 0.34375V5.54598L16.8882 2.06648Z\" fill=\"#154CCF\"></path> <path d=\"M4.71143 17.9326C5.73342 18.7181 6.91135 19.3104 8.19096 19.6553V14.4531L4.71143 17.9326Z\" fill=\"#154CCF\"></path> <path d=\"M8.19092 0.34375C6.91131 0.688672 5.73338 1.28098 4.71143 2.06645L8.19092 5.54594V0.34375Z\" fill=\"#154CCF\"></path> <path d=\"M13.4087 19.6553C14.6883 19.3104 15.8662 18.7181 16.8882 17.9326L13.4087 14.4531V19.6553Z\" fill=\"#154CCF\"></path> <path d=\"M15.2529 12.6094L18.7324 16.0889C19.5179 15.067 20.1102 13.889 20.4551 12.6094H15.2529Z\" fill=\"#154CCF\"></path> <path d=\"M20.7152 8.69566H12.1042H12.1042V0.0846484C11.6772 0.0290625 11.2419 0 10.7998 0C10.3577 0 9.92242 0.0290625 9.49547 0.0846484V8.69559V8.69563H0.884453C0.828867 9.12262 0.799805 9.55793 0.799805 10C0.799805 10.4421 0.828867 10.8774 0.884453 11.3043H9.49539H9.49543V19.9154C9.92242 19.9709 10.3577 20 10.7998 20C11.2419 20 11.6772 19.971 12.1041 19.9154V11.3044V11.3044H20.7152C20.7707 10.8774 20.7998 10.4421 20.7998 10C20.7998 9.55793 20.7707 9.12262 20.7152 8.69566Z\" fill=\"#E74A3F\"></path> <path d=\"M13.4087 12.6094L17.871 17.0718C18.0763 16.8666 18.2721 16.6521 18.4588 16.4298L14.6385 12.6094H13.4087V12.6094Z\" fill=\"#E74A3F\"></path> <path d=\"M8.19089 12.6094H8.19081L3.72852 17.0717C3.93367 17.2769 4.14816 17.4727 4.37051 17.6595L8.19089 13.839V12.6094Z\" fill=\"#E74A3F\"></path> <path d=\"M8.19127 7.39215V7.39207L3.72893 2.92969C3.52369 3.13484 3.32791 3.34934 3.14111 3.57168L6.96154 7.39211H8.19127V7.39215Z\" fill=\"#E74A3F\"></path> <path d=\"M13.4087 7.392L17.8711 2.92957C17.6659 2.72434 17.4514 2.52855 17.2291 2.3418L13.4087 6.16223V7.392Z\" fill=\"#E74A3F\"></path> <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M10.7998 19.5167C16.0557 19.5167 20.3165 15.2559 20.3165 10C20.3165 4.74409 16.0557 0.483333 10.7998 0.483333C5.54389 0.483333 1.28314 4.74409 1.28314 10C1.28314 15.2559 5.54389 19.5167 10.7998 19.5167ZM20.7998 10C20.7998 15.5228 16.3227 20 10.7998 20C5.27696 20 0.799805 15.5228 0.799805 10C0.799805 4.47715 5.27696 0 10.7998 0C16.3227 0 20.7998 4.47715 20.7998 10Z\" fill=\"black\" fill-opacity=\"0.1\"></path> </g> <defs> <clipPath id=\"clip0_12930_18349\"> <rect width=\"20\" height=\"20\" fill=\"white\" transform=\"translate(0.799805)\"></rect> </clipPath> </defs> </svg>",
      IT: "<svg width=\"21\" height=\"20\" viewBox=\"0 0 21 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"flag-icon\" style=\"width: 20px; height: 20px\"> <g clip-path=\"url(#clip0_12932_19384)\"> <path d=\"M10.7998 20C16.3227 20 20.7998 15.5228 20.7998 10C20.7998 4.47715 16.3227 0 10.7998 0C5.27696 0 0.799805 4.47715 0.799805 10C0.799805 15.5228 5.27696 20 10.7998 20Z\" fill=\"#F2C55D\"></path> <path d=\"M19.659 5.35714C17.9864 2.17229 14.6468 0 10.7998 0C6.95282 0 3.6132 2.17229 1.94066 5.35714H19.659Z\" fill=\"#E74A3F\"></path> <path d=\"M0.799807 9.99354C0.799805 9.99569 0.799805 9.99784 0.799805 10C0.799805 10.0022 0.799805 10.0043 0.799807 10.0065V9.99354Z\" fill=\"#E74A3F\"></path> <path d=\"M1.94043 14.6426C3.61297 17.8274 6.95259 19.9997 10.7996 19.9997C14.6466 19.9997 17.9862 17.8274 19.6587 14.6426H1.94043Z\" fill=\"#E74A3F\"></path> <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M10.7998 19.5167C16.0557 19.5167 20.3165 15.2559 20.3165 10C20.3165 4.74409 16.0557 0.483333 10.7998 0.483333C5.54389 0.483333 1.28314 4.74409 1.28314 10C1.28314 15.2559 5.54389 19.5167 10.7998 19.5167ZM20.7998 10C20.7998 15.5228 16.3227 20 10.7998 20C5.27696 20 0.799805 15.5228 0.799805 10C0.799805 4.47715 5.27696 0 10.7998 0C16.3227 0 20.7998 4.47715 20.7998 10Z\" fill=\"black\" fill-opacity=\"0.1\"></path> </g> <defs> <clipPath id=\"clip0_12932_19384\"> <rect width=\"20\" height=\"20\" fill=\"white\" transform=\"translate(0.799805)\"></rect> </clipPath> </defs> </svg>",
      GE: "<svg width=\"21\" height=\"20\" viewBox=\"0 0 21 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"flag-icon\" style=\"width: 20px; height: 20px\"> <g clip-path=\"url(#clip0_12932_18789)\"> <path d=\"M1.42188 13.4789C2.8348 17.2869 6.50023 20.0007 10.7999 20.0007C15.0995 20.0007 18.765 17.2869 20.1779 13.4789L10.7999 12.6094L1.42188 13.4789Z\" fill=\"#F2C55D\"></path> <path d=\"M10.7999 0C6.50023 0 2.8348 2.71375 1.42188 6.52176L10.7999 7.39129L20.1779 6.52172C18.765 2.71375 15.0995 0 10.7999 0Z\" fill=\"black\"></path> <path d=\"M1.4218 6.52148C1.01984 7.6048 0.799805 8.77652 0.799805 9.99972C0.799805 11.2229 1.01984 12.3946 1.4218 13.478H20.1779C20.5798 12.3946 20.7998 11.2229 20.7998 9.99972C20.7998 8.77652 20.5798 7.6048 20.1778 6.52148H1.4218Z\" fill=\"#E74A3F\"></path> <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M10.7998 19.5167C16.0557 19.5167 20.3165 15.2559 20.3165 10C20.3165 4.74409 16.0557 0.483333 10.7998 0.483333C5.54389 0.483333 1.28314 4.74409 1.28314 10C1.28314 15.2559 5.54389 19.5167 10.7998 19.5167ZM20.7998 10C20.7998 15.5228 16.3227 20 10.7998 20C5.27696 20 0.799805 15.5228 0.799805 10C0.799805 4.47715 5.27696 0 10.7998 0C16.3227 0 20.7998 4.47715 20.7998 10Z\" fill=\"black\" fill-opacity=\"0.1\"></path> </g> <defs> <clipPath id=\"clip0_12932_18789\"> <rect width=\"20\" height=\"20\" fill=\"white\" transform=\"translate(0.799805)\"></rect> </clipPath> </defs> </svg>",
      FR: "<svg width=\"21\" height=\"20\" viewBox=\"0 0 21 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"flag-icon\" style=\"width: 20px; height: 20px\"> <g clip-path=\"url(#clip0_12932_22801)\"> <path d=\"M10.7998 20C16.3227 20 20.7998 15.5228 20.7998 10C20.7998 4.47715 16.3227 0 10.7998 0C5.27696 0 0.799805 4.47715 0.799805 10C0.799805 15.5228 5.27696 20 10.7998 20Z\" fill=\"white\"></path> <path d=\"M20.7996 9.99911C20.7996 5.69946 18.0858 2.03402 14.2778 0.621094V19.3772C18.0858 17.9642 20.7996 14.2988 20.7996 9.99911Z\" fill=\"#E74A3F\"></path> <path d=\"M0.799805 9.99909C0.799805 14.2987 3.51359 17.9642 7.32156 19.3771V0.621094C3.51359 2.03402 0.799805 5.69945 0.799805 9.99909Z\" fill=\"#154CCF\"></path> <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M10.7998 19.5167C16.0557 19.5167 20.3165 15.2559 20.3165 10C20.3165 4.74409 16.0557 0.483333 10.7998 0.483333C5.54389 0.483333 1.28314 4.74409 1.28314 10C1.28314 15.2559 5.54389 19.5167 10.7998 19.5167ZM20.7998 10C20.7998 15.5228 16.3227 20 10.7998 20C5.27696 20 0.799805 15.5228 0.799805 10C0.799805 4.47715 5.27696 0 10.7998 0C16.3227 0 20.7998 4.47715 20.7998 10Z\" fill=\"black\" fill-opacity=\"0.1\"></path> </g> <defs> <clipPath id=\"clip0_12932_22801\"> <rect width=\"20\" height=\"20\" fill=\"white\" transform=\"translate(0.799805)\"></rect> </clipPath> </defs> </svg>",
    };
    return flagIcons[languageCode] || flagIcons.EN;
  };

  return (
    <section className="flex w-full flex-col items-start max-md:overflow-x-auto">
      <table className="w-full max-md:min-w-[800px]">
        <thead className="max-sm:hidden">
          <tr className="flex w-full items-start gap-2.5 px-0 py-2 border-b-[#DAE1EA] border-b border-solid">
            <th className="flex-[1_0_0] text-[#666E7E] text-sm font-bold leading-[21px] text-left">
              Name
            </th>
            <th className="flex-[1_0_0] text-[#666E7E] text-sm font-bold leading-[21px] text-left">
              Gender
            </th>
            <th className="flex-[1_0_0] text-[#666E7E] text-sm font-bold leading-[21px] text-left">
              Languages
            </th>
            <th className="flex-[1_0_0] text-[#666E7E] text-sm font-bold leading-[21px] text-left">
              Accent
            </th>
            <th className="flex-[1_0_0] text-[#666E7E] text-sm font-bold leading-[21px] text-left">
              Voice DNA
            </th>
            <th className="w-80 shrink-0 text-[#666E7E] text-sm font-bold leading-[21px] gap-2.5 pl-10 max-md:w-[200px] max-md:pl-5 text-left">
              Tags
            </th>
            <th className="flex items-center gap-2.5 w-[100px] shrink-0">
            </th>
          </tr>
        </thead>
        <tbody className="flex flex-col items-start w-full">
          {voices.map((voice) => (
            <tr
              key={voice.id}
              className="flex w-full items-center gap-2.5 px-0 py-3.5 border-b-[#DAE1EA] border-b border-solid max-md:min-w-[800px] max-sm:flex-col max-sm:items-start max-sm:gap-2 max-sm:border max-sm:mb-2 max-sm:p-4 max-sm:rounded-lg max-sm:border-solid max-sm:border-[#DAE1EA]"
            >
              <td className="flex-[1_0_0] text-[#1E2D40] text-base font-normal leading-6 max-sm:font-bold max-sm:mb-2">
                {voice.name}
              </td>
              <td className="flex-[1_0_0] text-[#252B2F] text-base font-normal leading-6 max-sm:mb-1">
                {voice.gender}
              </td>
              <td className="flex items-center gap-2 flex-[1_0_0] max-sm:mb-1">
                <div dangerouslySetInnerHTML={{ __html: getFlagIcon(voice.languageCode) }} />
                <span className="text-[#1E2D40] text-base font-normal leading-6">
                  {voice.languageCode}
                </span>
              </td>
              <td className="flex-[1_0_0] text-[#1E2D40] text-base font-normal leading-6 max-sm:mb-1">
                {voice.accent}
              </td>
              <td className="flex-[1_0_0] max-sm:w-full max-sm:mb-2">
                <span className="text-[#1E2D40] text-[13px] font-medium leading-[19.5px] lowercase gap-1 rounded bg-[#F3F5F8] px-2 py-0.5 inline-block">
                  {voice.voiceDNA}
                </span>
              </td>
              <td className="flex w-80 items-start gap-1 shrink-0 pl-10 max-md:w-[200px] max-md:pl-5 max-sm:w-full max-sm:flex-wrap">
                {voice.tags.slice(0, 2).map((tag, index) => (
                  <span
                    key={index}
                    className="text-[#4B5766] text-[13px] font-medium leading-[19.5px] lowercase gap-1 bg-[#F3F5F8] px-2 py-0.5 rounded-[20px]"
                  >
                    {tag}
                  </span>
                ))}
                {voice.tags.length > 2 && (
                  <span className="text-[#4B5766] text-[13px] font-medium leading-[19.5px] lowercase gap-1 bg-[#F3F5F8] px-2 py-0.5 rounded-[20px]">
                    +{voice.tags.length - 2}
                  </span>
                )}
              </td>
              <td className="flex items-center gap-2.5 w-[100px] shrink-0 max-sm:w-full max-sm:justify-end max-sm:mt-2">
                <button onClick={() => onEdit(voice)} aria-label={`Edit ${voice.name}`}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"edit-icon\" style=\"width: 24px; height: 24px\"> <path d=\"M17.6879 3C16.8376 3 15.9873 3.32238 15.3429 3.96708L4.85489 14.4541C4.6559 14.6531 4.51016 14.9006 4.43289 15.1723L3.02715 20.0947C2.99248 20.2165 2.99099 20.3453 3.02282 20.4679C3.05464 20.5905 3.11864 20.7023 3.20819 20.7919C3.29774 20.8814 3.40959 20.9454 3.53216 20.9773C3.65474 21.0091 3.78359 21.0076 3.90539 20.9729L8.82872 19.5672C8.82903 19.5669 8.82934 19.5666 8.82965 19.5663C9.0995 19.4887 9.34636 19.3448 9.54594 19.1452L20.033 8.6572C21.3223 7.36787 21.3223 5.25642 20.033 3.96708C19.3886 3.32238 18.5383 3 17.6879 3ZM17.6879 4.41314C18.1716 4.41314 18.6546 4.59951 19.027 4.97211C19.0274 4.97211 19.0277 4.97211 19.028 4.97211C19.7742 5.71832 19.7742 6.90596 19.028 7.65218L18.109 8.57114L15.4289 5.89107L16.3479 4.97211C16.7203 4.59951 17.2043 4.41314 17.6879 4.41314ZM14.4239 6.89609L17.104 9.57616L8.53999 18.1402C8.51221 18.1678 8.47702 18.1889 8.43726 18.2003L4.74477 19.2553L5.79976 15.5619C5.79977 15.5616 5.79977 15.5613 5.79976 15.561C5.81063 15.5228 5.83053 15.4886 5.85992 15.4592L14.4239 6.89609Z\" fill=\"#116EEE\"></path> </svg>",
                    }}
                  />
                </button>
                <button onClick={() => onDelete(voice)} aria-label={`Delete ${voice.name}`}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"delete-icon\" style=\"width: 24px; height: 24px\"> <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M10.4116 3C8.07248 3 6.17627 4.8962 6.17627 7.23529C6.17627 9.57438 8.07248 11.4706 10.4116 11.4706C12.7506 11.4706 14.6469 9.57438 14.6469 7.23529C14.6469 4.8962 12.7506 3 10.4116 3ZM7.23509 7.23529C7.23509 5.48098 8.65725 4.05882 10.4116 4.05882C12.1659 4.05882 13.588 5.48098 13.588 7.23529C13.588 8.98961 12.1659 10.4118 10.4116 10.4118C8.65725 10.4118 7.23509 8.98961 7.23509 7.23529Z\" fill=\"#116EEE\"></path> <path d=\"M5.12689 12.5293C3.95628 12.5293 3 13.4684 3 14.647C3 16.4376 3.8818 17.7877 5.26058 18.6669C6.61797 19.5324 8.44792 19.9411 10.4118 19.9411C10.8468 19.9411 11.2752 19.9211 11.6934 19.8804C11.442 19.5675 11.2222 19.2281 11.0389 18.8669C10.8332 18.8771 10.624 18.8823 10.4118 18.8823C8.57459 18.8823 6.96337 18.4968 5.82983 17.7741C4.71769 17.065 4.05882 16.0327 4.05882 14.647C4.05882 14.0611 4.53303 13.5881 5.12689 13.5881H11.0468C11.2404 13.2093 11.4743 12.8545 11.7429 12.5293H5.12689Z\" fill=\"#116EEE\"></path> <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M21.0001 16.2354C21.0001 18.8669 18.8669 21.0001 16.2354 21.0001C13.6039 21.0001 11.4707 18.8669 11.4707 16.2354C11.4707 13.6039 13.6039 11.4707 16.2354 11.4707C18.8669 11.4707 21.0001 13.6039 21.0001 16.2354ZM14.1051 15.74C13.8262 15.74 13.6001 15.9661 13.6001 16.245C13.6001 16.5239 13.8262 16.75 14.1051 16.75H18.3951C18.674 16.75 18.9001 16.5239 18.9001 16.245C18.9001 15.9661 18.674 15.74 18.3951 15.74H14.1051Z\" fill=\"#116EEE\"></path> </svg>",
                    }}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}; 