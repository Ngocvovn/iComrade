#!/bin/bash
if [[ ( "$TRAVIS_BRANCH" == "development" ) || ( "$TRAVIS_BRANCH" == "master" ) ]]; then
	if [ "$TRAVIS_BRANCH" == "development" ]; then 
		APPLICATION="$DEV_APPLICATION_NAME"
		TAG="iComrade-dev$TRAVIS_BUILD_NUMBER"
		ENV="$DEV_ENV"
		echo "${ZIP}"
	elif [ "$TRAVIS_BRANCH" == "master" ]; then
		APPLICATION="$APPLICATION_NAME"
		TAG="iComrade-$TRAVIS_BUILD_NUMBER"
		ENV="$ENV_NAME"
	fi
	sed -i='' "s/<AWS_ACCOUNT_ID>/$AWS_ACCOUNT_ID/" $AWS_EB
    sed -i='' "s/<REGION>/$REGION/" $AWS_EB
    sed -i='' "s/<TAG>/$TAG/" $AWS_EB
	zip -r $TAG $AWS_EB
	aws s3 cp $TAG.zip s3://$S3_BUCKET/$TAG.zip
	sudo docker tag test:$TRAVIS_BUILD_NUMBER $AWS_ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/test:"$TAG"
	sudo docker push $AWS_ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/test:"$TAG"
	aws elasticbeanstalk create-application-version --region $REGION --application-name $APPLICATION --version-label $TAG --source-bundle S3Bucket=$S3_BUCKET,S3Key=$TAG.zip
	aws elasticbeanstalk update-environment --environment-name $ENV --region $REGION --version-label $TAG
fi