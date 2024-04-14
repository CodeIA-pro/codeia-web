import React from 'react';
import { Fragment, useEffect, useRef  } from 'react';
import { useGithubStatus } from '../../queries/useGithub';
import GithubView from '../../pages/GithubView';
import ConnectionView from '../../pages/ConnectionView';
import { GenericFrame } from '../../common/Frame/GenericFrame';
import Progress from '../../common/Progress/Progress';
import { useLocation, useNavigate } from 'react-router-dom';
import { GithubContext } from '../../context/GithubConnect';
import { useQueryClient } from '@tanstack/react-query';

export const RedirectGithubView: React.FC = () => {
    const codeRef = useRef('');
    const { isLoading, data, isFetching } = useGithubStatus();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { connect, isLoading:loadingConnect } = React.useContext(GithubContext);
    const location = useLocation();

    useEffect(() => {
      const getCodeFromUrl = () => {
        const queryString = location.search;
        const urlParams = new URLSearchParams(queryString);
        const codeParam = urlParams.get('code');
        (async () => {
          if (codeParam && codeParam !== codeRef.current && !loadingConnect) {
            codeRef.current = codeParam;
            try {
              connect(codeRef.current).then((response) => {
                if (response.status === 'success') {
                  queryClient.invalidateQueries(['github-status']);
                }}).finally(() => {
                  navigate('/connection');
                });
            } catch (err) {
              console.log(err);
            }
          }
        })();
      };
    
      getCodeFromUrl();
    }, [location.search, loadingConnect, codeRef, connect, navigate, queryClient]);

  return (
    <Fragment>
      {isLoading || loadingConnect || isFetching ? (
        <GenericFrame>
          <Progress />
        </GenericFrame>
      ) : data?.status === 'success' ? (
        <GithubView />
      ) : (
        <ConnectionView />
      )}
    </Fragment>
  );
};